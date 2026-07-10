import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'
import { sendMetaPurchase } from './_meta-capi.js'
import { PURCHASE_VALUE } from '../shared/pricing.js'

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
  if (!codeMatch || amount !== PURCHASE_VALUE) {
    return res.status(200).json({ ok: true, skipped: true })
  }

  const order_code = `QT-${codeMatch[1]}`

  // Atomic conditional update làm bước đầu tiên — chặn 2 lần gọi webhook
  // đồng thời (SePay retry) cùng vượt qua check pending trước khi có side effect.
  const { data: order } = await supabase
    .from('orders')
    .update({ status: 'completed' })
    .eq('order_code', order_code)
    .eq('status', 'pending')
    .select()
    .single()

  if (!order) return res.status(200).json({ ok: true, idempotent: true })

  const password = crypto.randomBytes(5).toString('hex')
  const { error: authError } = await supabase.auth.admin.createUser({
    email: order.email,
    password,
    email_confirm: true,
  })
  if (authError && authError.message !== 'User already registered') {
    // Order đã bị đánh dấu 'completed' ở bước claim phía trên — báo lỗi rõ ràng
    // để can thiệp thủ công thay vì im lặng bỏ qua một đơn đã thu tiền.
    console.error('[sepay-webhook] CRITICAL createUser error, đơn đã completed nhưng chưa tạo được tài khoản:', order_code, order.email, authError)
    return res.status(500).json({ error: 'Không thể tạo tài khoản' })
  }

  const mlRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
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
  if (!mlRes.ok) {
    const mlError = await mlRes.text().catch(() => '')
    console.error('[sepay-webhook] CRITICAL MailerLite error, khách đã thanh toán nhưng chưa nhận được email đăng nhập:', order_code, order.email, mlRes.status, mlError)
  }

  const capiResult = await sendMetaPurchase({ email: order.email, phone: order.phone, order_code })
  if (!capiResult.ok) {
    console.error('[sepay-webhook] Meta CAPI Purchase thất bại, mất event quảng cáo:', order_code, capiResult.error || capiResult.data)
  }

  console.log('[sepay-webhook] Hoàn thành:', order_code, order.email)
  return res.status(200).json({ ok: true })
}
