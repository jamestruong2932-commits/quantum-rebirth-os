import crypto from 'crypto'

export const config = { api: { bodyParser: false } }

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => (data += chunk))
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

function verifyHmac(rawBody, signature, secret) {
  const computed = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('hex')
  return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const secret = process.env.SEPAY_WEBHOOK_SECRET
  if (!secret) return res.status(500).json({ error: 'Missing SEPAY_WEBHOOK_SECRET' })

  const rawBody = await readRawBody(req)

  // SePay gửi chữ ký trong header X-Webhook-Token
  const signature = req.headers['x-webhook-token'] || req.headers['x-api-key']
  if (!signature || !verifyHmac(rawBody, signature, secret)) {
    return res.status(401).json({ error: 'Invalid signature' })
  }

  let payload
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  // Chỉ xử lý giao dịch tiền vào
  if (payload.transferType !== 'in') return res.status(200).json({ ok: true })

  const content = (payload.content || '').toUpperCase()
  const amount  = Number(payload.transferAmount)

  // Kiểm tra đúng nội dung CK (bắt đầu bằng QUANTUM) và số tiền
  const EXPECTED_AMOUNT = 1790000
  const phoneMatch = content.match(/QUANTUM\s*(\d{9,11})/)

  if (!phoneMatch || amount !== EXPECTED_AMOUNT) {
    // Không phải đơn hàng của mình — bỏ qua, vẫn trả 200 cho SePay
    return res.status(200).json({ ok: true, skipped: true })
  }

  const phone = phoneMatch[1]
  console.log('[SePay] Xác nhận thanh toán — SĐT:', phone, '| Số tiền:', amount)

  // TODO: tạo tài khoản Supabase + gửi email (Bước tiếp theo)

  return res.status(200).json({ ok: true, phone })
}
