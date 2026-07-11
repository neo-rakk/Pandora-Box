type SupabaseUploadResult = {
  url: string
  path: string
  bucket: string
}

const DEFAULT_BUCKET = 'pandora-uploads'

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || DEFAULT_BUCKET

  if (!url || !serviceKey) return null

  return {
    url: url.replace(/\/$/, ''),
    serviceKey,
    bucket,
  }
}

async function ensurePublicBucket(url: string, serviceKey: string, bucket: string) {
  const bucketUrl = `${url}/storage/v1/bucket/${bucket}`
  const headers = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    'Content-Type': 'application/json',
  }

  const existingBucket = await fetch(bucketUrl, { headers })
  if (existingBucket.ok) return

  const createBucket = await fetch(`${url}/storage/v1/bucket`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ id: bucket, name: bucket, public: true }),
  })

  if (!createBucket.ok && createBucket.status !== 409) {
    const message = await createBucket.text().catch(() => 'Unable to create Supabase bucket')
    throw new Error(message)
  }
}

export async function uploadImageToSupabaseStorage(file: File, buffer: Buffer, filename: string): Promise<SupabaseUploadResult | null> {
  const config = getSupabaseConfig()
  if (!config) return null

  await ensurePublicBucket(config.url, config.serviceKey, config.bucket)

  const objectPath = `dashboard/${filename}`
  const uploadUrl = `${config.url}/storage/v1/object/${config.bucket}/${objectPath}`
  const upload = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      apikey: config.serviceKey,
      Authorization: `Bearer ${config.serviceKey}`,
      'Content-Type': file.type || 'application/octet-stream',
      'Cache-Control': '31536000',
      'x-upsert': 'true',
    },
    body: buffer,
  })

  if (!upload.ok) {
    const message = await upload.text().catch(() => 'Supabase upload failed')
    throw new Error(message)
  }

  return {
    bucket: config.bucket,
    path: objectPath,
    url: `${config.url}/storage/v1/object/public/${config.bucket}/${objectPath}`,
  }
}
