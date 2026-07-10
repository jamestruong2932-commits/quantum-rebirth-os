import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'
import { sendMetaPurchase } from './_meta-capi.js'

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

function verifyToken(signature, secret) {
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(secret))
  } catch {
    return false
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const secret = process.env.SEPAY_SECRET
  if (!secret) return res.status(500).json({ error: 'Missing SEPAY_SECRET' })

  const rawBody = await readRawBody(req)

  const signature = req.headers['x-webhook-token'] || req.headers['x-api-key'] || ''
  if (!signature || !verifyToken(signature, secret)) {
    return res.status(401).json({ error: 'Invalid signature' })
  }

  let payload
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  // Chỉ xử lý tiền vào
  if (payload.transferType !== 'in') return res.status(200).json({ ok: true })

  const content = payload.content || ''
  const amount  = Number(payload.transferAmount)

  const codeMatch = content.match(/QT-\d+/)
  if (!codeMatch || amount !== 1790000) {
    return res.status(200).json({ ok: true, skipped: true })
  }

  const order_code = codeMatch[0]

  // Idempotent: chỉ xử lý đơn pending
  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('order_code', order_code)
    .eq('status', 'pending')
    .single()

  if (!order) return res.status(200).json({ ok: true, idempotent: true })

  // Tạo tài khoản Supabase
  const password = crypto.randomBytes(5).toString('hex')
  const { error: authError } = await supabase.auth.admin.createUser({
    email: order.email,
    password,
    email_confirm: true,
  })
  if (authError && authError.message !== 'User already registered') {
    console.error('[payment-webhook] createUser error:', authError)
    return res.status(500).json({ error: 'Không thể tạo tài khoản' })
  }

  // Gửi vào MailerLite — automation sẽ email thông tin đăng nhập cho khách
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

  // Đánh dấu hoàn thành
  await supabase.from('orders').update({ status: 'completed' }).eq('order_code', order_code)

  await sendMetaPurchase({ email: order.email, phone: order.phone, order_code })

  console.log('[payment-webhook] Hoàn thành:', order_code, order.email)
  return res.status(200).json({ ok: true })
}
