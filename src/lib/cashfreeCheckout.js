export async function loadCashfree() {
  if (window.Cashfree) return window.Cashfree

  await new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-cashfree-sdk]')
    if (existing) {
      existing.addEventListener('load', resolve, { once: true })
      existing.addEventListener('error', reject, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js'
    script.async = true
    script.dataset.cashfreeSdk = 'true'
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })

  return window.Cashfree
}

export function cashfreeModeFromOrder(order) {
  return order?.cashfreeEnv === 'sandbox' ? 'sandbox' : 'production'
}

export async function openCashfreeCheckout(paymentSessionId, mode = 'production') {
  const Cashfree = await loadCashfree()
  if (!Cashfree || !paymentSessionId) {
    throw new Error('Cashfree session is missing on this order')
  }

  const cashfree = Cashfree({ mode })
  await cashfree.checkout({
    paymentSessionId,
    redirectTarget: '_self',
  })
}
