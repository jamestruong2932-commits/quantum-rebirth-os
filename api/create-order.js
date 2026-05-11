import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.quantumrebirth.io.vn')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, phone } = req.body || {}
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Thiếu thông tin' })
  }

  const order_code = `QT-${Date.now()}`

  const { error } = await supabase.from('orders').insert({
    order_code,
    name,
    email,
    phone,
    status: 'pending',
  })

  if (error) {
    console.error('[create-order] Supabase error:', error)
    return res.status(500).json({ error: 'Không thể tạo đơn hàng' })
  }

  console.log('[create-order] Đơn mới:', order_code, email)
  return res.status(200).json({ order_code })
}
