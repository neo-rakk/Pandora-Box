import crypto from 'crypto'
import fs from 'fs/promises'
import path from 'path'
import { readJsonFromSupabase, writeJsonToSupabase } from '@/lib/supabase-store'

const AUTH_FILE = path.join(process.cwd(), 'auth.json')
const DEFAULT_ADMIN_TOKEN = 'pandora-box-local-admin-token'
const DEFAULT_ADMIN_PASSWORD = '123456'
const AUTH_OBJECT_PATH = 'auth/admin.json'

type AuthConfig = {
  passwordHash?: string
}

function getPasswordSecret() {
  return process.env.AUTH_SECRET || process.env.ADMIN_TOKEN || DEFAULT_ADMIN_TOKEN
}

function hashPassword(password: string) {
  return crypto.createHmac('sha256', getPasswordSecret()).update(password).digest('hex')
}

function safeCompare(value: string, expected: string) {
  const valueBuffer = Buffer.from(value)
  const expectedBuffer = Buffer.from(expected)

  if (valueBuffer.length !== expectedBuffer.length) return false
  return crypto.timingSafeEqual(valueBuffer, expectedBuffer)
}

async function readAuthConfig(): Promise<AuthConfig> {
  try {
    const supabaseConfig = await readJsonFromSupabase<AuthConfig>(AUTH_OBJECT_PATH)
    if (supabaseConfig) return supabaseConfig
  } catch (error) {
    console.warn('Unable to read admin auth from Supabase, falling back to auth.json:', error)
  }

  try {
    const content = await fs.readFile(AUTH_FILE, 'utf-8')
    return JSON.parse(content) as AuthConfig
  } catch {
    return {}
  }
}

async function writeAuthConfig(config: AuthConfig) {
  try {
    const storedInSupabase = await writeJsonToSupabase(AUTH_OBJECT_PATH, config)
    if (storedInSupabase) return
  } catch (error) {
    console.warn('Unable to persist admin auth to Supabase, falling back to auth.json:', error)
  }

  await fs.writeFile(AUTH_FILE, JSON.stringify(config, null, 2))
}

export function getAdminToken() {
  return process.env.ADMIN_TOKEN || DEFAULT_ADMIN_TOKEN
}

export function verifyAdminToken(token: string | null | undefined) {
  if (!token) return false
  return safeCompare(token, getAdminToken())
}

export async function verifyAdminPassword(password: string) {
  const authConfig = await readAuthConfig()
  const configuredHash = authConfig.passwordHash

  if (configuredHash) {
    return safeCompare(hashPassword(password), configuredHash)
  }

  const envPassword = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD
  return safeCompare(password, envPassword)
}

export async function updateAdminPassword(currentPassword: string, nextPassword: string) {
  const isCurrentPasswordValid = await verifyAdminPassword(currentPassword)

  if (!isCurrentPasswordValid) {
    return { ok: false, status: 401, error: 'Current password is invalid' }
  }

  if (nextPassword.trim().length < 8) {
    return { ok: false, status: 400, error: 'New password must be at least 8 characters long' }
  }

  const nextConfig: AuthConfig = {
    passwordHash: hashPassword(nextPassword),
  }

  await writeAuthConfig(nextConfig)
  return { ok: true, status: 200 }
}
