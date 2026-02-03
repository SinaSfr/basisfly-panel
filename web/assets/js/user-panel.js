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

  // اگر هر کدوم از المنت‌های مورد نیاز وجود نداشت، کل اسکریپت اجرا نشه
  if (
    !openDobPopupButton ||
    !openPassportExpiryPopupButton ||
    !closeDatePopupButton ||
    !datePopup ||
    !gregorianBtn ||
    !jalaliBtn ||
    !daySelect ||
    !monthSelect ||
    !yearSelect ||
    !selectDateBtn
  ) {
    return
  }

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
  openDobPopupButton.addEventListener('focus', () => {
    targetInputField = 'dobInput'
    currentDateType = 'gregorian'
    datePopup.classList.remove('panel-hidden')
    setActiveDateType()
    updateDateSelectors()
  })

  // باز کردن پاپ‌آپ تاریخ انقضای پاسپورت
  openPassportExpiryPopupButton.addEventListener('focus', () => {
    targetInputField = 'passportExpiryInput'
    currentDateType = 'gregorian'
    datePopup.classList.remove('panel-hidden')
    setActiveDateType()
    updateDateSelectors()
  })

  function setActiveDateType() {
    if (currentDateType === 'gregorian') {
      // Gregorian فعال
      gregorianBtn.classList.add('panel-bg-primary-800', 'panel-text-white')
      gregorianBtn.classList.remove('panel-bg-zinc-200')

      jalaliBtn.classList.remove('panel-bg-primary-800', 'panel-text-white')
      jalaliBtn.classList.add('panel-bg-zinc-200')
    } else {
      // Jalali فعال
      jalaliBtn.classList.add('panel-bg-primary-800', 'panel-text-white')
      jalaliBtn.classList.remove('panel-bg-zinc-200')

      gregorianBtn.classList.remove('panel-bg-primary-800', 'panel-text-white')
      gregorianBtn.classList.add('panel-bg-zinc-200')
    }
  }

  // بستن پاپ‌آپ
  function closeDatePopup() {
    datePopup.classList.add('panel-hidden')
    if (targetInputField) {
      document.getElementById(targetInputField).blur()
    }
  }

  closeDatePopupButton.addEventListener('click', closeDatePopup)

  datePopup.addEventListener('click', (e) => {
    if (e.target === datePopup) {
      closeDatePopup()
    }
  })

  // سوئیچ بین تاریخ میلادی و شمسی
  gregorianBtn.addEventListener('click', () => {
    currentDateType = 'gregorian'
    setActiveDateType()
    updateDateSelectors()
  })

  jalaliBtn.addEventListener('click', () => {
    currentDateType = 'jalali'
    setActiveDateType()
    updateDateSelectors()
  })

  function getGregorianMonthDays(year, month) {
    if (month === 2) {
      // ساده: فعلاً 29 مجاز (بدون محاسبه سال کبیسه)
      return 29
    }

    return [4, 6, 9, 11].includes(month) ? 30 : 31
  }

  function getJalaliMonthDays(month) {
    if (month <= 6) return 31
    if (month <= 11) return 30
    return 29 // اسفند (فعلاً بدون کبیسه)
  }

  function updateDaysByMonth() {
    const month = parseInt(monthSelect.value)
    const year = parseInt(yearSelect.value)

    // اگر ماه انتخاب نشده → روز غیرفعال و placeholder کوتاه
    if (!month) {
      daySelect.innerHTML = '<option value="">روز</option>'
      daySelect.disabled = true
      return
    }

    // وقتی ماه انتخاب شد → روز فعال
    daySelect.disabled = false

    let maxDays = 31

    if (currentDateType === 'gregorian') {
      maxDays = getGregorianMonthDays(year, month)
    } else {
      maxDays = getJalaliMonthDays(month)
    }

    const currentDay = daySelect.value

    daySelect.innerHTML = '<option value="">روز</option>'

    for (let d = 1; d <= maxDays; d++) {
      const option = document.createElement('option')
      option.value = d
      option.textContent = d
      daySelect.appendChild(option)
    }

    // اگر روز قبلی بزرگ‌تر از max بود ریست کن
    if (currentDay > maxDays) {
      daySelect.value = ''
    } else {
      daySelect.value = currentDay
    }
  }
  // به‌روزرسانی انتخاب‌های تاریخ
  function updateDateSelectors() {
    let dates
    if (currentDateType === 'gregorian') {
      dates = gregorianDates
    } else {
      dates = jalaliDates
    }

    // ماه‌ها
    monthSelect.innerHTML = '<option value="">ماه</option>'
    dates.months.forEach((month, index) => {
      const option = document.createElement('option')
      option.value = index + 1
      option.textContent = month
      monthSelect.appendChild(option)
    })

    // سال‌ها
    yearSelect.innerHTML = '<option value="">سال</option>'
    dates.years.forEach((year) => {
      const option = document.createElement('option')
      option.value = year
      option.textContent = year
      yearSelect.appendChild(option)
    })

    // روزها (بر اساس ماه و سال فعلی، اگر انتخاب شده باشه)
    updateDaysByMonth()

    // پاک کردن انتخاب قبلی (بدون هیچ پیش‌فرضی)
    daySelect.value = ''
    monthSelect.value = ''
    yearSelect.value = ''
  }

  function pad(num) {
    return num.toString().padStart(2, '0')
  }

  // انتخاب تاریخ
  selectDateBtn.addEventListener('click', () => {
    const day = daySelect.value
    const month = monthSelect.value
    const year = yearSelect.value

    if (!day || !month || !year) {
      alert('لطفاً تاریخ را کامل انتخاب کنید')
      return
    }

    const targetField = document.getElementById(targetInputField)
    if (!targetField) return

    const formattedDate = `${year}/${pad(month)}/${pad(day)}`

    targetField.value = formattedDate
    targetField.dataset.type = currentDateType

    closeDatePopup()
  })
  monthSelect.addEventListener('change', updateDaysByMonth)
  yearSelect.addEventListener('change', updateDaysByMonth)
})

//------------------------Advanced Search --------------------------
;(() => {
  const openBtn = document.getElementById('btnOpenAdvancedSearch')
  const modalId =
    openBtn?.getAttribute('data-modal-open') || 'advancedContractSearch'
  const modal = document.getElementById(modalId)
  const closeBtn = document.getElementById('btnCloseAdvancedSearch')

  if (!openBtn || !modal || !closeBtn) return

  const lockScroll = (locked) => {
    document.documentElement.classList.toggle('panel-overflow-hidden', locked)
  }

  const openModal = () => {
    modal.classList.remove('panel-hidden')
    modal.setAttribute('aria-hidden', 'false')
    lockScroll(true)
  }

  const closeModal = () => {
    modal.classList.add('panel-hidden')
    modal.setAttribute('aria-hidden', 'true')
    lockScroll(false)
  }

  openBtn.addEventListener('click', openModal)
  closeBtn.addEventListener('click', closeModal)

  // کلیک روی بک‌دراپ (خارج از content)
  modal.addEventListener('click', (e) => {
    const inside = e.target.closest('[data-modal-content]')
    if (!inside) closeModal()
  })

  // ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('panel-hidden'))
      closeModal()
  })
})()

//----------------clear advanced search---------------------
;(() => {
  const modal = document.getElementById('advancedContractSearch')
  const clearBtn = document.getElementById('btnClearAdvancedSearchFilters')

  if (!modal || !clearBtn) return

  const clearAdvancedSearchFilters = () => {
    const scope = modal

    scope
      .querySelectorAll(
        'input[type="text"], input[type="search"], input[type="tel"], input[type="email"], input[type="number"], input[type="date"]',
      )
      .forEach((el) => {
        el.value = ''
        el.dispatchEvent(new Event('input', { bubbles: true }))
        el.dispatchEvent(new Event('change', { bubbles: true }))
      })

    scope
      .querySelectorAll('input[type="radio"], input[type="checkbox"]')
      .forEach((el) => {
        el.checked = false
        el.dispatchEvent(new Event('change', { bubbles: true }))
      })

    scope.querySelectorAll('textarea').forEach((el) => {
      el.value = ''
      el.dispatchEvent(new Event('input', { bubbles: true }))
      el.dispatchEvent(new Event('change', { bubbles: true }))
    })

    scope.querySelectorAll('select').forEach((el) => {
      el.selectedIndex = 0
      el.dispatchEvent(new Event('change', { bubbles: true }))
    })
  }

  clearBtn.addEventListener('click', clearAdvancedSearchFilters)
})()

// ----------dropdown menu (advanced search)--------------
/* =========================================================
   Shared Dropdown (Dynamic) + API JSON Adapter (NO LOGS)
   - Uses one global store (window.sharedDDStore)
   - Waits for response if data is not ready
   - Reads: startcity/endcity/airline/routecode/hotel/train
   - UI keys stay: origin_city/destination_city/airline/route_code/hotel/rail_company
========================================================= */

/* =======================
   1) Global store
======================= */
document.addEventListener('DOMContentLoaded', () => {
  const buyerRadio = document.getElementById('advSearchBuyerInfoType')
  const buyerInput = document.getElementById('advSearchBuyerInfo')

  const passengerRadio = document.getElementById('advSearchPassengerInfoType')
  const passengerInput = document.getElementById('advSearchPassengerInfo')

  if (!buyerRadio || !buyerInput || !passengerRadio || !passengerInput) return

  const setMode = (mode) => {
    const isBuyer = mode === 'buyer'
    const isPassenger = mode === 'passenger'

    buyerInput.disabled = !isBuyer
    passengerInput.disabled = !isPassenger

    if (!isBuyer) buyerInput.value = ''
    if (!isPassenger) passengerInput.value = ''

    buyerInput.dispatchEvent(new Event('input', { bubbles: true }))
    buyerInput.dispatchEvent(new Event('change', { bubbles: true }))
    passengerInput.dispatchEvent(new Event('input', { bubbles: true }))
    passengerInput.dispatchEvent(new Event('change', { bubbles: true }))
  }

  buyerRadio.addEventListener('change', () => {
    if (buyerRadio.checked) setMode('buyer')
  })

  passengerRadio.addEventListener('change', () => {
    if (passengerRadio.checked) setMode('passenger')
  })

  buyerInput.addEventListener('focus', () => {
    buyerRadio.checked = true
    setMode('buyer')
  })

  passengerInput.addEventListener('focus', () => {
    passengerRadio.checked = true
    setMode('passenger')
  })

  // حالت اولیه
  if (buyerRadio.checked) setMode('buyer')
  else if (passengerRadio.checked) setMode('passenger')
  else setMode('buyer') // پیش‌فرض: خریدار
})

window.sharedDDStore =
  window.sharedDDStore ||
  (() => {
    let data = null
    let pending = false
    let waiters = []

    const settleAll = (fn) => {
      const arr = waiters
      waiters = []
      arr.forEach(fn)
    }

    const normalizeJson = (json) => {
      let v = json

      if (typeof v === 'string') {
        try {
          v = JSON.parse(v)
        } catch {
          v = null
        }
      }

      if (v && (typeof v === 'object' || Array.isArray(v))) return v
      return null
    }

    return {
      startRequest() {
        data = null
        pending = true
        document.dispatchEvent(new CustomEvent('sharedDropdown:dataPending'))
      },

      set(json) {
        data = normalizeJson(json)
        pending = false
        settleAll((w) => w.resolve(data))
        document.dispatchEvent(new CustomEvent('sharedDropdown:dataUpdated'))
      },

      fail(err) {
        pending = false
        settleAll((w) => w.reject(err || new Error('request failed')))
        document.dispatchEvent(new CustomEvent('sharedDropdown:dataFailed'))
      },

      get() {
        return data
      },

      has() {
        return !!data
      },

      isPending() {
        return pending
      },

      wait(timeoutMs = 15000) {
        if (data) return Promise.resolve(data)

        return new Promise((resolve, reject) => {
          let t = null
          if (timeoutMs) {
            t = setTimeout(() => reject(new Error('timeout')), timeoutMs)
          }

          waiters.push({
            resolve: (d) => {
              t && clearTimeout(t)
              resolve(d)
            },
            reject: (e) => {
              t && clearTimeout(t)
              reject(e)
            },
          })
        })
      },
    }
  })()

/* =======================
   2) API handler
======================= */
async function onProcessedSearch_item(args) {
  const store = window.sharedDDStore
  store.startRequest()

  try {
    const res = args?.response
    if (!res) throw new Error('no response')

    const json = await (res.clone ? res.clone().json() : res.json())
    store.set(json)
  } catch (e) {
    store.fail(e)
  }
}

/* =======================
   3) Dropdown UI
======================= */
document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById('sharedDropdown')
  const search = document.getElementById('sharedDropdownSearch')
  const list = document.getElementById('sharedDropdownList')
  if (!dropdown || !search || !list) return

  const store = window.sharedDDStore
  const toStr = (v) => (v == null ? '' : String(v))

  const jsonKeyMap = Object.freeze({
    origin_city: 'startcity',
    destination_city: 'endcity',
    airline: 'airline',
    route_code: 'routecode',
    hotel: 'hotel',
    rail_company: 'train',
    services: 'type',
  })

  const ddConfigs = {
    origin_city: {
      ph: 'جستجوی شهر مبدا...',
      dynamic: true,
      hiddenSelector: 'input[name="_root.route.start.city"]'
    },
    destination_city: {
      ph: 'جستجوی شهر مقصد...',
      dynamic: true,
      hiddenSelector: 'input[name="_root.route.end.city"]'
    },
    hotel: {
      ph: 'جستجوی هتل...',
      dynamic: true,
      hiddenSelector: 'input[name="_root.route.hotelid_search"]'
    },
    airline: {
      ph: 'جستجوی ایرلاین...',
      dynamic: true,
      hiddenSelector: 'input[name="_root.route.airline"]'
    },
    rail_company: { ph: 'جستجوی شرکت ریلی...', dynamic: true },
    route_code: { ph: 'جستجوی کد مسیر...', dynamic: true },

    status: {
      ph: 'وضعیت...',
      items: [
        { value: '0', label: 'قرارداد' },
        { value: '1', label: 'پیش قرارداد' },
      ],
    },
    tag: {
      ph: 'برچسب...',
      items: [
        { value: '', label: 'تمام قراردادها' },
        { value: '0', label: 'قراردادهای تسویه نشده' },
        { value: '1', label: 'قراردادهای تسویه شده آنلاین' },
        { value: '3', label: 'قراردادهای ویرایش شده' },
        { value: '4', label: 'قراردادهای ابطال شده' },
        { value: '7', label: 'قراردادهای ابطال نشده' },
        { value: '2', label: 'قراردادهای تسویه نشده با تایید مالی' },
        { value: '5', label: 'قراردادهای تسویه شده توسط مالی' },
        { value: '6', label: 'قراردادهای پرداخت اعتباری' },
        { value: '8', label: 'پرداخت اعتباری - تسویه شده توسط مالی' },
      ],
    },
    services: {
      ph: 'نوع...',
      dynamic: true,
      hiddenSelector: 'input[name="_root.type"]' 
    },
  }

  const mapCity = (arr) =>
    (Array.isArray(arr) ? arr : [])
      .map((x) => ({ value: toStr(x?.id), label: toStr(x?.name) }))
      .filter((x) => x.label)

  const mapNameId = (arr) =>
    (Array.isArray(arr) ? arr : [])
      .map((x) => ({ value: toStr(x?.id ?? x?.name), label: toStr(x?.name) }))
      .filter((x) => x.label)

  const mapRoute = (arr) =>
    (Array.isArray(arr) ? arr : [])
      .map((x) => {
        const n = toStr(x?.name)
        return { value: n, label: n }
      })
      .filter((x) => x.label)

  const renderEmpty = (text) => {
    list.innerHTML = ''
    const el = document.createElement('div')
    el.className = 'panel-p-3 panel-text-sm panel-text-zinc-500'
    el.textContent = text
    list.appendChild(el)
  }

  const renderList = (items) => {
    if (!items?.length) return renderEmpty('موردی یافت نشد')

    list.innerHTML = ''
    const frag = document.createDocumentFragment()

    items.forEach((item) => {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className =
        'panel-w-full panel-text-right panel-px-3 panel-py-3 panel-rounded-lg panel-text-sm hover:panel-bg-zinc-100 panel-transition panel-duration-200'
      btn.setAttribute('role', 'option')
      btn.dataset.value = toStr(item.value)
      btn.dataset.label = toStr(item.label)
      btn.textContent = toStr(item.label)
      frag.appendChild(btn)
    })

    list.appendChild(frag)
  }

  const filterItems = (items, q) => {
    const query = (q || '').trim().toLowerCase()
    if (!query) return items
    return items.filter((x) => toStr(x.label).toLowerCase().includes(query))
  }

  let lastData = null
  const dynCache = new Map()

  const getDynamicItems = (key) => {
    const data = store.get()
    if (!data) return []

    if (data !== lastData) {
      lastData = data
      dynCache.clear()
    }

    if (dynCache.has(key)) return dynCache.get(key)

    const raw = data?.[jsonKeyMap[key]]
    let items = []

    if (key === 'origin_city' || key === 'destination_city')
      items = mapCity(raw)
    else if (key === 'route_code') items = mapRoute(raw)
    else items = mapNameId(raw)

    dynCache.set(key, items)
    return items
  }

  const getItems = (key) => {
    const cfg = ddConfigs[key]
    if (!cfg) return []
    if (cfg.dynamic) return getDynamicItems(key)
    return Array.isArray(cfg.items) ? cfg.items : []
  }

  let activeWrap = null
  let activeInput = null
  let activeKey = null

  const isOpen = () => !dropdown.classList.contains('panel-hidden')

  const closeDropdown = () => {
    dropdown.classList.add('panel-hidden')
    activeWrap = null
    activeInput = null
    activeKey = null
  }

  const positionDropdownUnder = (wrapEl) => {
    const rect = wrapEl.getBoundingClientRect()
    dropdown.style.left = `${rect.left}px`
    dropdown.style.top = `${rect.bottom + 8}px`
    dropdown.style.width = `${rect.width}px`
  }

  const openDropdown = async (wrapEl) => {
    const key = wrapEl.getAttribute('data-dd-key')
    const input = wrapEl.querySelector('[data-dd-input]')
    if (!key || !input) return

    const cfg = ddConfigs[key]
    if (!cfg) return

    activeWrap = wrapEl
    activeInput = input
    activeKey = key

    positionDropdownUnder(wrapEl)
    dropdown.classList.remove('panel-hidden')

    search.value = ''
    search.placeholder = cfg.ph || 'جستجو...'
    search.focus()

    if (cfg.dynamic && !store.has()) {
      renderEmpty('در حال دریافت اطلاعات...')
      try {
        await store.wait(15000)
      } catch {
        renderEmpty('دریافت اطلاعات طول کشید. دوباره تلاش کنید.')
        return
      }
    }

    renderList(filterItems(getItems(key), search.value))
  }

  const smartReposition = () => {
    if (!activeWrap || !isOpen()) return
    positionDropdownUnder(activeWrap)
  }
  window.addEventListener('scroll', smartReposition, true)
  window.addEventListener('resize', smartReposition)

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('button[role="option"]')
    if (!btn || !activeInput) return

    const label = btn.dataset.label || ''
    const value = btn.dataset.value || ''

    // 1) متن (name) تو input اصلی
    activeInput.value = label
    activeInput.dataset.value = value

    // 2) id تو hidden (اگر تعریف شده باشد)
    const cfg = ddConfigs[activeKey]
    if (cfg?.hiddenSelector && activeWrap) {
      const hidden = activeWrap.querySelector(cfg.hiddenSelector)
      if (hidden) {
        hidden.value = value
        hidden.dispatchEvent(new Event('input', { bubbles: true }))
        hidden.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }

    // رویدادهای input اصلی
    activeInput.dispatchEvent(new Event('input', { bubbles: true }))
    activeInput.dispatchEvent(new Event('change', { bubbles: true }))

    closeDropdown()
  })

  document.addEventListener('click', async (e) => {
    if (e.target.closest('#sharedDropdown')) return

    const wrap = e.target.closest('[data-dd-key]')
    if (!wrap) {
      if (isOpen()) closeDropdown()
      return
    }

    if (wrap === activeWrap && isOpen()) {
      closeDropdown()
      return
    }

    await openDropdown(wrap)
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDropdown()
  })

  search.addEventListener('input', () => {
    if (!activeKey) return
    const cfg = ddConfigs[activeKey]
    if (cfg?.dynamic && !store.has())
      return renderEmpty('در حال دریافت اطلاعات...')
    renderList(filterItems(getItems(activeKey), search.value))
  })

  document.addEventListener('sharedDropdown:dataUpdated', () => {
    if (!activeKey || !isOpen()) return
    renderList(filterItems(getItems(activeKey), search.value))
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
