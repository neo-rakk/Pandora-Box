import fs from 'fs/promises'
import path from 'path'
import { readJsonFromSupabase, writeJsonToSupabase } from '@/lib/supabase-store'

const DB_FILE = path.join(process.cwd(), 'data.json')
const CONTENT_OBJECT_PATH = 'cms/data.json'

export async function readContentData<T>(fallbackData: T): Promise<T> {
  try {
    const supabaseData = await readJsonFromSupabase<T>(CONTENT_OBJECT_PATH)
    if (supabaseData) return supabaseData
  } catch (error) {
    console.warn('Unable to read CMS content from Supabase, falling back to data.json:', error)
  }

  try {
    const content = await fs.readFile(DB_FILE, 'utf-8')
    return JSON.parse(content) as T
  } catch {
    return fallbackData
  }
}

export async function writeContentData<T>(data: T) {
  try {
    const storedInSupabase = await writeJsonToSupabase(CONTENT_OBJECT_PATH, data)
    if (storedInSupabase) return { storage: 'supabase' }
  } catch (error) {
    console.warn('Unable to persist CMS content to Supabase, falling back to data.json:', error)
  }

  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2))
  return { storage: 'filesystem' }
}
