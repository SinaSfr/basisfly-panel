(() => {
    const visibilityAmountBtn = document.querySelector("[data-toggle-amount]");
    const panelWalletAmount = document.querySelector(".panel-wallet-amount");
    if (!visibilityAmountBtn || !panelWalletAmount) return;
  
    const original = panelWalletAmount.dataset.amount || panelWalletAmount.textContent.trim();
    panelWalletAmount.dataset.amount = original;
  
    const masked = original.replace(/\d/g, "*");
  
    let hidden = false;
  
    const render = () => {
      panelWalletAmount.textContent = hidden ? masked : original;
      visibilityAmountBtn.setAttribute("aria-pressed", String(hidden));
  
      visibilityAmountBtn.querySelector("use").setAttribute("href", hidden
        ? "../assets/images/panel-sprite-icons.svg#icon-eye-slash"
        : "../assets/images/panel-sprite-icons.svg#icon-eye");
    };
  
    visibilityAmountBtn.addEventListener("click", () => {
      hidden = !hidden;
      render();
    });
  
    render();
  })();


  document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.querySelector('.panel-increase-balance__open-btn')
  if (!openBtn) return

  const root = openBtn.closest('section') || document
  const popup = root.querySelector('.panel-increase-balance__popup')
  const closeBtn = root.querySelector('.panel-increase-balance__close-btn')

  if (!popup) return

  const openPopup = () => {
    popup.classList.remove('panel-hidden')
    popup.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
  }

  const closePopup = () => {
    popup.classList.add('panel-hidden')
    popup.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
  }

  openBtn.addEventListener('click', openPopup)

  if (closeBtn) {
    closeBtn.addEventListener('click', closePopup)
    closeBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') closePopup()
    })
  }

  popup.addEventListener('click', (e) => {
    if (e.target === popup) closePopup()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !popup.classList.contains('panel-hidden')) {
      closePopup()
    }
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const root =
    document.querySelector('.panel-increase-balance__amount-input')?.closest('section') || document

  const payBtn = root.querySelector('.panel-increase-balance__pay-btn, .panel-increase-balance-pay-btn')
  const amountInput = root.querySelector('.panel-increase-balance__amount-input')
  const errorEl = root.querySelector('.panel-increase-balance__amount-error')
  const gateways = root.querySelector('.panel-increase-balance__gateways')

  if (!payBtn || !amountInput || !errorEl) return

  const normalizeNumber = (val) => String(val || '').replace(/[^\d]/g, '')

  const hideGateways = () => {
    if (gateways) gateways.classList.add('panel-hidden')
  }

  const showGateways = () => {
    if (gateways) gateways.classList.remove('panel-hidden')
  }

  const showError = (msg) => {
    errorEl.textContent = msg
    errorEl.classList.remove('panel-hidden')

    amountInput.classList.add('panel-border-red-500')
    amountInput.classList.remove('panel-border-zinc-200')
    amountInput.setAttribute('aria-invalid', 'true')

    hideGateways() // ✅ اگر خطا داریم لیست مخفی شود
  }

  const clearError = () => {
    errorEl.textContent = ''
    errorEl.classList.add('panel-hidden')

    amountInput.classList.remove('panel-border-red-500')
    amountInput.classList.add('panel-border-zinc-200')
    amountInput.removeAttribute('aria-invalid')
  }

  // موقع تایپ: فقط عدد نگه دار + خطا رو پاک کن
  amountInput.addEventListener('input', () => {
    const cleaned = normalizeNumber(amountInput.value)
    if (amountInput.value !== cleaned) amountInput.value = cleaned

    // ✅ اگر خالی یا کمتر از ۵ رقم شد، لیست بسته شود
    if (!cleaned || cleaned.length < 5) {
      hideGateways()
    }

    clearError()
  })

  payBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const raw = amountInput.value
    const cleaned = normalizeNumber(raw)

    if (!cleaned) {
      showError('مبلغ را وارد کنید.')
      return
    }

    if (cleaned.length < 5) {
      showError('مبلغ باید حداقل ۵ رقم باشد.')
      return
    }

    clearError()
    showGateways() // ✅ فقط وقتی معتبره نمایش بده
  })
})