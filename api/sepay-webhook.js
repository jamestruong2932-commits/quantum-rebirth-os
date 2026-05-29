import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

export const config = { api: { bodyParser: false } }

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => (data += chunk))
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

function safeEqual(a, b) {
  try { return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b)) } catch { return false }
}

function verifySignature(rawBody, signature, secret, timestamp) {
  return [
    crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex'),
    crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('base64'),
    crypto.createHmac('sha256', secret).update(timestamp + rawBody, 'utf8').digest('hex'),
    crypto.createHmac('sha256', secret).update(timestamp + '.' + rawBody, 'utf8').digest('hex'),
  ].some(c => safeEqual(c, signature))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const secret = process.env.SEPAY_WEBHOOK_SECRET
  if (!secret) return res.status(500).json({ error: 'Missing SEPAY_WEBHOOK_SECRET' })

  const rawBody = await readRawBody(req)

  const rawSig   = req.headers['x-sepay-signature'] || ''
  const timestamp = req.headers['x-sepay-timestamp'] || ''
  // SePay gửi dạng "sha256=<hex>" — strip prefix trước khi verify
  const signature = rawSig.startsWith('sha256=') ? rawSig.slice(7) : rawSig
  if (!signature || !verifySignature(rawBody, signature, secret, timestamp)) {
    return res.status(401).json({ error: 'Invalid signature' })
  }

  let payload
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  const type    = payload.transferType || ''
  const amount  = Number(payload.transferAmount || 0)
  const content = payload.content || payload.description || ''

  if (type !== 'in') return res.status(200).json({ ok: true })

  const codeMatch = content.match(/QT-?(\d+)/)
  if (!codeMatch || amount !== 1790000) {
    return res.status(200).json({ ok: true, skipped: true })
  }

  const order_code = `QT-${codeMatch[1]}`

  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('order_code', order_code)
    .eq('status', 'pending')
    .single()

  if (!order) return res.status(200).json({ ok: true, idempotent: true })

  const password = crypto.randomBytes(5).toString('hex')
  const { error: authError } = await supabase.auth.admin.createUser({
    email: order.email,
    password,
    email_confirm: true,
  })
  if (authError && authError.message !== 'User already registered') {
    console.error('[sepay-webhook] createUser error:', authError)
    return res.status(500).json({ error: 'Không thể tạo tài khoản' })
  }

  await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: order.email,
      fields: {
        name:      order.name,
        password,
        login_url: process.env.COURSE_LOGIN_URL,
      },
      groups: [process.env.ML_GROUP_BUYERS],
    }),
  })

  await supabase.from('orders').update({ status: 'completed' }).eq('order_code', order_code)

  console.log('[sepay-webhook] Hoàn thành:', order_code, order.email)
  return res.status(200).json({ ok: true })
}
