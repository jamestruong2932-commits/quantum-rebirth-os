import crypto from 'crypto'
import { PURCHASE_VALUE } from '../shared/pricing.js'

const META_PIXEL_ID = '37029946209982129'

function sha256(value) {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex')
}

function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

function normalizePhone(phone) {
  const digits = phone.replace(/\D/g, '')
  return digits.startsWith('0') ? `84${digits.slice(1)}` : digits
}

/**
 * Sends a server-side Purchase event to Meta Conversions API.
 * Fired only after SePay webhook confirms payment (status: 'completed') —
 * never from the client, since the browser has no reliable "paid" signal.
 */
export async function sendMetaPurchase({ email, phone, order_code, testEventCode }) {
  const token = process.env.META_CAPI_ACCESS_TOKEN
  if (!token) {
    console.error('[meta-capi] Missing META_CAPI_ACCESS_TOKEN env var — Purchase event not sent')
    return { ok: false, error: 'missing_token' }
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [{
            event_name: 'Purchase',
            event_time: Math.floor(Date.now() / 1000),
            event_id: order_code,
            action_source: 'website',
            event_source_url: 'https://www.quantumrebirth.io.vn/',
            user_data: {
              em: [sha256(normalizeEmail(email))],
              ...(phone ? { ph: [sha256(normalizePhone(phone))] } : {}),
            },
            custom_data: {
              value: PURCHASE_VALUE,
              currency: 'VND',
              content_ids: [order_code],
              content_type: 'product',
            },
          }],
          ...(testEventCode ? { test_event_code: testEventCode } : {}),
        }),
      }
    )
    const data = await res.json()
    if (!res.ok) console.error('[meta-capi] Meta API error:', data)
    return { ok: res.ok, data }
  } catch (err) {
    console.error('[meta-capi] Request failed:', err)
    return { ok: false, error: String(err) }
  }
}
