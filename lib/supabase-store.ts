const DEFAULT_CMS_BUCKET = 'pandora-cms'

type SupabaseStoreConfig = {
  url: string
  serviceKey: string
  bucket: string
}

function getSupabaseStoreConfig(): SupabaseStoreConfig | null {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY
  const bucket = process.env.SUPABASE_CMS_BUCKET || DEFAULT_CMS_BUCKET

  if (!url || !serviceKey) return null

  return {
    url: url.replace(/\/$/, ''),
    serviceKey,
    bucket,
  }
}

async function ensurePrivateBucket(config: SupabaseStoreConfig) {
  const headers = {
    apikey: config.serviceKey,
    Authorization: `Bearer ${config.serviceKey}`,
    'Content-Type': 'application/json',
  }

  const existingBucket = await fetch(`${config.url}/storage/v1/bucket/${config.bucket}`, { headers })
  if (existingBucket.ok) return

  const createBucket = await fetch(`${config.url}/storage/v1/bucket`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ id: config.bucket, name: config.bucket, public: false }),
  })

  if (!createBucket.ok && createBucket.status !== 409) {
    const message = await createBucket.text().catch(() => 'Unable to create Supabase CMS bucket')
    throw new Error(message)
  }
}

export async function readJsonFromSupabase<T>(objectPath: string): Promise<T | null> {
  const config = getSupabaseStoreConfig()
  if (!config) return null

  await ensurePrivateBucket(config)

  const response = await fetch(`${config.url}/storage/v1/object/${config.bucket}/${objectPath}`, {
    headers: {
      apikey: config.serviceKey,
      Authorization: `Bearer ${config.serviceKey}`,
    },
    cache: 'no-store',
  })

  if (response.status === 404) return null
  if (!response.ok) {
    const message = await response.text().catch(() => 'Unable to read Supabase JSON object')
    throw new Error(message)
  }

  return (await response.json()) as T
}

export async function writeJsonToSupabase(objectPath: string, value: unknown) {
  const config = getSupabaseStoreConfig()
  if (!config) return false

  await ensurePrivateBucket(config)

  const response = await fetch(`${config.url}/storage/v1/object/${config.bucket}/${objectPath}`, {
    method: 'POST',
    headers: {
      apikey: config.serviceKey,
      Authorization: `Bearer ${config.serviceKey}`,
      'Content-Type': 'application/json',
      'Cache-Control': '60',
      'x-upsert': 'true',
    },
    body: JSON.stringify(value, null, 2),
  })

  if (!response.ok) {
    const message = await response.text().catch(() => 'Unable to write Supabase JSON object')
    throw new Error(message)
  }

  return true
}
