;(() => {
  const visibilityAmountBtn = document.querySelector('[data-toggle-amount]')
  const panelWalletAmount = document.querySelector('.panel-wallet-amount')
  if (!visibilityAmountBtn || !panelWalletAmount) return

  const original =
    panelWalletAmount.dataset.amount || panelWalletAmount.textContent.trim()
  panelWalletAmount.dataset.amount = original

  const masked = original.replace(/\d/g, '*')

  let hidden = false

  const render = () => {
    panelWalletAmount.textContent = hidden ? masked : original
    visibilityAmountBtn.setAttribute('aria-pressed', String(hidden))

    visibilityAmountBtn
      .querySelector('use')
      .setAttribute(
        'href',
        hidden
          ? '../assets/images/panel-sprite-icons.svg#icon-eye-slash'
          : '../assets/images/panel-sprite-icons.svg#icon-eye',
      )
  }

  visibilityAmountBtn.addEventListener('click', () => {
    hidden = !hidden
    render()
  })

  render()
})()

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
    document
      .querySelector('.panel-increase-balance__amount-input')
      ?.closest('section') || document

  const payBtn = root.querySelector(
    '.panel-increase-balance__pay-btn, .panel-increase-balance-pay-btn',
  )
  const amountInput = root.querySelector(
    '.panel-increase-balance__amount-input',
  )
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

document.addEventListener('DOMContentLoaded', function () {
  // فیلدهای فارسی
  const persianInputs = document.querySelectorAll(
    '#firstNamePersian, #lastNamePersian',
  )
  // فیلدهای لاتین
  const latinInputs = document.querySelectorAll(
    '#firstNameLatin, #lastNameLatin',
  )
  // فیلد کد ملی
  const numericInputs = document.querySelectorAll('#nationalCode')

  // اعمال Validation برای ورودی‌های فارسی
  persianInputs.forEach((input) => {
    input.addEventListener('input', function () {
      validatePersian(this)
    })
  })

  // اعمال Validation برای ورودی‌های لاتین
  latinInputs.forEach((input) => {
    input.addEventListener('input', function () {
      validateLatin(this)
    })
  })

  // اعمال Validation برای ورودی‌های عددی
  numericInputs.forEach((input) => {
    input.addEventListener('input', function () {
      validateNumeric(this)
    })
  })

  // باز کردن پاپ‌آپ
  if (document.getElementById('openPassengerModal')) {
    document
      .getElementById('openPassengerModal')
      .addEventListener('click', function () {
        document.getElementById('passengerModal').classList.remove('hidden')
      })
  }

  // بستن پاپ‌آپ
  if (document.getElementById('closePassengerModal')) {
    document
      .getElementById('closePassengerModal')
      .addEventListener('click', function () {
        document.getElementById('passengerModal').classList.add('hidden')
      })
  }
})

// تایید ورودی‌های فارسی (فقط فارسی مجاز است)
function validatePersian(input) {
  input.value = input.value.replace(/[^ء-ي\s]/g, '') // فقط کاراکترهای فارسی و فاصله مجاز است
}

// تایید ورودی‌های لاتین (فقط لاتین مجاز است)
function validateLatin(input) {
  input.value = input.value.replace(/[^a-zA-Z\s]/g, '') // فقط حروف لاتین و فاصله مجاز است
}

// تایید کد ملی (فقط اعداد مجاز هستند)
function validateNumeric(input) {
  input.value = input.value.replace(/[^0-9]/g, '') // فقط اعداد مجاز هستند
}

document.addEventListener('DOMContentLoaded', function () {
  const openDobPopupButton = document.getElementById('dobInput')
  const openPassportExpiryPopupButton = document.getElementById(
    'passportExpiryInput',
  )
  const closeDatePopupButton = document.getElementById('closeDatePopup')
  const datePopup = document.getElementById('datePopup')
  const gregorianBtn = document.getElementById('gregorianBtn')
  const jalaliBtn = document.getElementById('jalaliBtn')
  const daySelect = document.getElementById('day')
  const monthSelect = document.getElementById('month')
  const yearSelect = document.getElementById('year')
  const selectDateBtn = document.getElementById('selectDateBtn')

  let currentDateType = 'gregorian' // پیش‌فرض میلادی
  let targetInputField = null // این برای مشخص کردن اینکه تاریخ مربوط به کدام فیلد است

  // تاریخ‌های میلادی
  const gregorianDates = {
    months: [
      'ژانویه',
      'فوریه',
      'مارس',
      'آوریل',
      'مه',
      'ژوئن',
      'ژوئیه',
      'اوت',
      'سپتامبر',
      'اکتبر',
      'نوامبر',
      'دسامبر',
    ],
    days: Array.from({ length: 31 }, (_, i) => i + 1),
    years: Array.from({ length: 100 }, (_, i) => 1923 + i), // از 1923 تا 2022
  }

  // تاریخ‌های شمسی (برای مثال)
  const jalaliDates = {
    months: [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ],
    days: Array.from({ length: 31 }, (_, i) => i + 1),
    years: Array.from({ length: 100 }, (_, i) => 1400 + i), // از 1400 تا 1500
  }

  // باز کردن پاپ‌آپ تاریخ تولد
  openDobPopupButton.addEventListener('click', () => {
    targetInputField = 'dobInput' // مشخص کردن تاریخ تولد
    datePopup.classList.remove('hidden')
    updateDateSelectors()
  })

  // باز کردن پاپ‌آپ تاریخ انقضای پاسپورت
  openPassportExpiryPopupButton.addEventListener('click', () => {
    targetInputField = 'passportExpiryInput' // مشخص کردن تاریخ انقضا
    datePopup.classList.remove('hidden')
    updateDateSelectors()
  })

  // بستن پاپ‌آپ
  closeDatePopupButton.addEventListener('click', () => {
    datePopup.classList.add('hidden')
  })

  // سوئیچ بین تاریخ میلادی و شمسی
  gregorianBtn.addEventListener('click', () => {
    currentDateType = 'gregorian'
    updateDateSelectors()
  })

  jalaliBtn.addEventListener('click', () => {
    currentDateType = 'jalali'
    updateDateSelectors()
  })

  // به‌روزرسانی انتخاب‌های تاریخ
  function updateDateSelectors() {
    let dates
    if (currentDateType === 'gregorian') {
      dates = gregorianDates
    } else {
      dates = jalaliDates
    }

    // ماه‌ها
    monthSelect.innerHTML = '<option>ماه</option>'
    dates.months.forEach((month, index) => {
      const option = document.createElement('option')
      option.value = index + 1
      option.textContent = month
      monthSelect.appendChild(option)
    })

    // روزها
    daySelect.innerHTML = '<option>روز</option>'
    dates.days.forEach((day) => {
      const option = document.createElement('option')
      option.value = day
      option.textContent = day
      daySelect.appendChild(option)
    })

    // سال‌ها
    yearSelect.innerHTML = '<option>سال</option>'
    dates.years.forEach((year) => {
      const option = document.createElement('option')
      option.value = year
      option.textContent = year
      yearSelect.appendChild(option)
    })
  }

  // انتخاب تاریخ
  selectDateBtn.addEventListener('click', () => {
    const selectedDay = daySelect.value
    const selectedMonth = monthSelect.value
    const selectedYear = yearSelect.value

    if (selectedDay && selectedMonth && selectedYear) {
      const selectedDate = `${selectedDay} ${selectedMonth} ${selectedYear}`
      // انتقال تاریخ به فیلد مربوطه
      const targetField = document.getElementById(targetInputField)
      if (targetField) {
        targetField.value = selectedDate
        datePopup.classList.add('hidden') // بستن پاپ‌آپ
      } else {
        console.error('فیلد مورد نظر برای تاریخ یافت نشد')
      }
    } else {
      alert('لطفاً تاریخ را کامل وارد کنید.')
    }
  })
})
/**
 * Sends edited user data to backend and shows loading state.
 */

const watchSchemaReady = ({
  containerSelector = '.Panel_UserInfo',
  schemaSelector = '[data-bc-schema-main-container]',
  btnSelector = '[data-btn-editUserSchema]',
  loadingSelector = '.panel-loading__content',
  timeoutMs = 15000,
} = {}) => {
  const show = (el) => el && el.classList.remove('panel-hidden')
  const hide = (el) => el && el.classList.add('panel-hidden')

  const applyReadyState = () => {
    const editBtn = document.querySelector(btnSelector)
    const loadingBox = document.querySelector(loadingSelector)
    hide(loadingBox)
    show(editBtn)
  }

  const isReady = () => {
    const container = document.querySelector(containerSelector)
    return !!container?.querySelector(schemaSelector)
  }

  if (isReady()) {
    applyReadyState()
    return () => {}
  }

  const container = document.querySelector(containerSelector)
  if (!container) {
    const bodyObserver = new MutationObserver(() => {
      const c = document.querySelector(containerSelector)
      if (!c) return

      bodyObserver.disconnect()
      const stop = watchSchemaReady({
        containerSelector,
        schemaSelector,
        btnSelector,
        loadingSelector,
        timeoutMs,
      })
      return stop
    })

    bodyObserver.observe(document.body, { childList: true, subtree: true })

    const t = setTimeout(() => bodyObserver.disconnect(), timeoutMs)
    return () => {
      clearTimeout(t)
      bodyObserver.disconnect()
    }
  }

  const observer = new MutationObserver(() => {
    if (!isReady()) return
    observer.disconnect()
    applyReadyState()
  })

  observer.observe(container, { childList: true, subtree: true })

  const timeoutId = setTimeout(() => {
    observer.disconnect()
    applyReadyState()
    console.warn('watchSchemaReady timeout:', {
      containerSelector,
      schemaSelector,
    })
  }, timeoutMs)

  return () => {
    clearTimeout(timeoutId)
    observer.disconnect()
  }
}

const runOnReady = (fn) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true })
  } else {
    fn()
  }
}

runOnReady(() => {
  const editBtn = document.querySelector('[data-btn-editUserSchema]')
  const loadingBox = document.querySelector('.panel-loading__content')

  const show = (el) => el && el.classList.remove('panel-hidden')
  const hide = (el) => el && el.classList.add('panel-hidden')

  hide(editBtn)
  show(loadingBox)

  watchSchemaReady({
    containerSelector: '.Panel_UserInfo',
    schemaSelector: '[data-bc-schema-main-container]',
    btnSelector: '[data-btn-editUserSchema]',
    loadingSelector: '.panel-loading__content',
    timeoutMs: 2000, // اختیاری
  })
})

const setBtnLoading = (btn, isLoading) => {
  if (!btn) return

  const content = btn.querySelector('.panel-btn__content')
  const loader = btn.querySelector('.panel-btn__loader')
  const hoverFx = btn.querySelector('.panel-btn__hoverfx')

  if (isLoading) {
    content && (content.style.opacity = '0')
    loader?.classList.remove('panel-hidden')
    hoverFx?.classList.add('panel-hidden')
    btn.style.pointerEvents = 'none'
  } else {
    content && (content.style.opacity = '')
    loader?.classList.add('panel-hidden')
    hoverFx?.classList.remove('panel-hidden')
    btn.style.pointerEvents = ''
  }
}

const editUserSchema = (args) => {
  const editBtn = document.querySelector('[data-btn-editUserSchema]')

  try {
    // Show loading before sending request
    setBtnLoading(editBtn, true)
    // Get the first row safely
    const row = args?.source?.rows?.[0]
    if (!row) {
      setBtnLoading(editBtn, false)
      return
    }

    // Convert row to JSON string (payload for backend/source)
    const payload = JSON.stringify(row)

    // Trigger edit user request
    $bc?.setSource?.('cms.editUserSchema', {
      value: payload,
      run: true,
    })
  } catch (err) {
    // Hide loading on error
    setBtnLoading(editBtn, false)
    console.error('editUserSchema error:', err)
  }
}

/**
 * Handles the response and toggles success/fail messages + hides loading.
 */
const onProcessededitUserSchema = async (args) => {
  const editBtn = document.querySelector('[data-btn-editUserSchema]')
  const successBox = document.querySelector(
    '.panel-successed__message__content',
  )
  const failedBox = document.querySelector('.panel-failed__message__content')

  const show = (el) => el && el.classList.remove('panel-hidden')
  const hide = (el) => el && el.classList.add('panel-hidden')

  const scrollToEl = (el) => {
    if (!el) return

    el.classList.remove('panel-hidden')

    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  // Reset state
  hide(successBox)
  hide(failedBox)

  try {
    const response = args?.response
    if (!response) throw new Error('Missing response')
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`)

    const json = await response.json()
    const errorId = Number(json?.errorid)

    setBtnLoading(editBtn, false)

    if (errorId === 102) {
      show(successBox)
      scrollToEl(successBox)
    } else {
      show(failedBox)
      scrollToEl(failedBox)
    }
  } catch (err) {
    setBtnLoading(editBtn, false)
    show(failedBox)
    scrollToEl(failedBox)

    console.error('onProcessededitUserSchema error:', err)
  }
}
