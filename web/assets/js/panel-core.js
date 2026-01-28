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

//------- increase ballance payment----------
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
    showGateways()
  })
})

// ------validateLatin and validatePersian-------
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
        document
          .getElementById('passengerModal')
          .classList.remove('panel-hidden')
      })
  }

  // بستن پاپ‌آپ
  if (document.getElementById('openPassengerModal')) {
    document
      .getElementById('closePassengerModal')
      .addEventListener('click', function () {
        document.getElementById('passengerModal').classList.add('panel-hidden')
      })
  }
})

// تایید ورودی‌های فارسی (فقط فارسی مجاز است)
function validatePersian(input) {
  input.value = input.value.replace(/[^ء-ي\s]/g, '')
}

// تایید ورودی‌های لاتین (فقط لاتین مجاز است)
function validateLatin(input) {
  input.value = input.value.replace(/[^a-zA-Z\s]/g, '')
}

// تایید کد ملی (فقط اعداد مجاز هستند)
function validateNumeric(input) {
  input.value = input.value.replace(/[^0-9]/g, '')
}

// -----passenger list popup date---------
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

// ------nationality and nationalcode ----------
document.addEventListener('DOMContentLoaded', () => {
  const nationalityInput = document.getElementById('nationality')
  const nationalCodeInput = document.getElementById('nationalCode')

  let nationalityDropdown = document.getElementById('nationalityDropdown')

  let countriesCache = null
  let isFetchingCountries = false

  async function fetchCountries() {
    if (countriesCache || isFetchingCountries) return

    isFetchingCountries = true

    // نمایش loader داخل dropdown
    nationalityDropdown.innerHTML =
      '<div class="panel-w-full panel-h-12"><span class="loader panel-flex panel-mx-auto"></span></div>'
    nationalityDropdown.classList.remove('panel-hidden')

    try {
      const res = await fetch('./country.json')
      const data = await res.json()

      countriesCache = data
    } catch (err) {
      console.error('خطا در دریافت کشورها', err)
      countriesCache = []
    } finally {
      isFetchingCountries = false
    }
  }

  function renderCountries(list) {
    nationalityDropdown.innerHTML = ''

    if (!list || !list.length) {
      nationalityDropdown.innerHTML =
        '<div class="panel-p-3 panel-text-sm panel-text-zinc-400">نتیجه‌ای یافت نشد</div>'
      return
    }

    list.forEach((country) => {
      const item = document.createElement('div')
      item.className =
        'panel-px-4 panel-py-2 panel-cursor-pointer hover:panel-bg-zinc-100 panel-text-sm'
      item.textContent = country.fa

      item.addEventListener('click', () => {
        nationalityInput.value = country.fa

        // ذخیره دیتا
        nationalityInput.dataset.id = country.id
        nationalityInput.dataset.code = country.code
        nationalityInput.dataset.en = country.en

        // فعال/غیرفعال کردن کد ملی
        if (country.fa !== 'ایران') {
          nationalCodeInput.disabled = true
          nationalCodeInput.value = ''
          nationalCodeInput.classList.add(
            'panel-bg-zinc-200',
            'panel-text-zinc-400',
            'panel-cursor-not-allowed',
          )
        } else {
          nationalCodeInput.disabled = false
          nationalCodeInput.classList.remove(
            'panel-bg-zinc-200',
            'panel-text-zinc-400',
            'panel-cursor-not-allowed',
          )
        }

        nationalityDropdown.classList.add('panel-hidden')
      })

      nationalityDropdown.appendChild(item)
    })
  }

  if (nationalityInput && nationalityDropdown) {
    nationalityInput.addEventListener('click', async () => {
      nationalityDropdown.classList.remove('panel-hidden')
      await fetchCountries()
      renderCountries(countriesCache)
    })
  }

  if (nationalityInput && nationalityDropdown) {
    nationalityInput.addEventListener('input', () => {
      if (!countriesCache) return

      const value = nationalityInput.value.trim().toLowerCase()
      const filtered = countriesCache.filter(
        (country) =>
          country.fa.includes(value) ||
          country.en.toLowerCase().includes(value),
      )

      renderCountries(filtered)
      nationalityDropdown.classList.remove('panel-hidden')
    })
  }

  document.addEventListener('click', (e) => {
    if (
      !nationalityInput.contains(e.target) &&
      !nationalityDropdown.contains(e.target)
    ) {
      nationalityDropdown.classList.add('panel-hidden')
    }
  })
})

// ----- بررسی فیلدهای اجباری برای مسافر -----
document.addEventListener('DOMContentLoaded', function () {
  const addPassengerBtn = document.getElementById('add-passenger-button')

  if (addPassengerBtn) {
    addPassengerBtn.addEventListener('click', function (e) {
      e.preventDefault() // جلوگیری از ارسال فرم تا زمانی که اعتبارسنجی انجام شود

      const result = validatePassengerFields()
      if (!result.isValid) {
        // فقط border قرمز نشان می‌دهیم
        highlightInvalidFields(result.invalidFields)
        return
      }

      // اگر همه چیز درست بود، borderها را پاک کن
      clearAllHighlights()
      console.log('همه فیلدهای اجباری پر شده‌اند')
      // اینجا می‌توانید کد ارسال فرم را قرار دهید
    })
  }
})

function validatePassengerFields() {
  const invalidFields = []

  // گرفتن مقادیر فیلدها
  const firstNameLatin = document.getElementById('firstNameLatin')
  const lastNameLatin = document.getElementById('lastNameLatin')
  const genderSelect = document.getElementById('gender')
  const nationality = document.getElementById('nationality')
  const nationalCode = document.getElementById('nationalCode')
  const dobInput = document.getElementById('dobInput')

  // بررسی فیلدهای اجباری
  if (!firstNameLatin.value.trim()) {
    invalidFields.push(firstNameLatin)
  }

  if (!lastNameLatin.value.trim()) {
    invalidFields.push(lastNameLatin)
  }

  // بررسی select جنسیت - مقدار نباید "gender" باشد
  if (
    genderSelect &&
    (!genderSelect.value ||
      genderSelect.value === '' ||
      genderSelect.value === 'gender')
  ) {
    invalidFields.push(genderSelect)
  }

  if (!nationality.value.trim()) {
    invalidFields.push(nationality)
  }

  // کد ملی فقط برای ایرانیان اجباری است
  if (nationality.value.trim() === 'ایران') {
    if (!nationalCode.value.trim()) {
      invalidFields.push(nationalCode)
    } else if (!isValidIranianNationalCode(nationalCode.value.trim())) {
      invalidFields.push(nationalCode)
    }
  }

  // تاریخ تولد اجباری است
  if (!dobInput.value.trim()) {
    invalidFields.push(dobInput)
  }

  return {
    isValid: invalidFields.length === 0,
    invalidFields: invalidFields,
  }
}

function isValidIranianNationalCode(input) {
  const code = input.toString().replace(/\D/g, '')

  if (code.length !== 10) {
    return false
  }

  const allDigitsSame = /^(\d)\1+$/.test(code)
  if (allDigitsSame) {
    return false
  }

  // الگوریتم اعتبارسنجی کد ملی ایران
  let sum = 0

  for (let i = 0; i < 9; i++) {
    sum += parseInt(code.charAt(i)) * (10 - i)
  }

  let remainder = sum % 11
  let controlDigit = parseInt(code.charAt(9))

  if (remainder < 2) {
    return controlDigit === remainder
  } else {
    return controlDigit === 11 - remainder
  }
}

function highlightInvalidFields(invalidFields) {
  clearAllHighlights()

  invalidFields.forEach((field) => {
    if (field) {
      field.classList.add('border-error')
    }
  })

  if (invalidFields.length > 0 && invalidFields[0]) {
    invalidFields[0].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
    invalidFields[0].focus()
  }
}

function clearAllHighlights() {
  document.querySelectorAll('.border-error').forEach((el) => {
    el.classList.remove('border-error')
  })
}

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

document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("sharedDropdown");
  const search = document.getElementById("sharedDropdownSearch");
  const list = document.getElementById("sharedDropdownList");

  if (!dropdown || !search || !list) return;

  // ========= 1) تنظیمات هر فیلد =========
  // items باید آرایه‌ای از { value, label } باشه
  const ddConfigs = {
    origin_city: {
      searchPlaceholder: "جستجوی شهر مبدا...",
      items: [
        { value: "THR", label: "تهران" },
        { value: "MHD", label: "مشهد" },
        { value: "IFN", label: "اصفهان" },
        { value: "SYZ", label: "شیراز" },
      ],
    },
    destination_city: {
      searchPlaceholder: "جستجوی شهر مقصد...",
      items: [
        { value: "KIH", label: "کیش" },
        { value: "TBZ", label: "تبریز" },
        { value: "BDH", label: "بندرعباس" },
      ],
    },
    hotel: {
      searchPlaceholder: "جستجوی هتل...",
      items: [],
      // اگر میخوای از API بیاری:
      // async getItems() { ... return [{value,label}, ...] }
    },
    airline: { searchPlaceholder: "جستجوی ایرلاین...", items: [] },
    rail_company: { searchPlaceholder: "جستجوی شرکت ریلی...", items: [] },
    route_code: { searchPlaceholder: "جستجوی کد مسیر...", items: [] },
    status: { searchPlaceholder: "وضعیت...", items: [] },
    tag: { searchPlaceholder: "برچسب...", items: [] },
    services: { searchPlaceholder: "خدمات...", items: [] },
  };

  // ========= 2) State + Cache =========
  let activeWrap = null;
  let activeInput = null;
  let activeKey = null;

  const itemsCache = new Map(); // key => items[]

  const getItemsForKey = async (key) => {
    const cfg = ddConfigs[key];
    if (!cfg) return [];

    if (itemsCache.has(key)) return itemsCache.get(key);

    let items = cfg.items || [];
    if (typeof cfg.getItems === "function") {
      items = await cfg.getItems();
    }

    itemsCache.set(key, items);
    return items;
  };

  // ========= 3) Render =========
  const renderList = (items) => {
    list.innerHTML = "";

    if (!items.length) {
      const empty = document.createElement("div");
      empty.className = "panel-p-3 panel-text-sm panel-text-zinc-500";
      empty.textContent = "موردی یافت نشد";
      list.appendChild(empty);
      return;
    }

    items.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "panel-w-full panel-text-right panel-px-3 panel-py-3 panel-rounded-lg panel-text-sm hover:panel-bg-zinc-100 panel-transition panel-duration-200";
      btn.setAttribute("role", "option");
      btn.dataset.value = item.value;
      btn.dataset.label = item.label;
      btn.textContent = item.label;

      btn.addEventListener("click", () => {
        if (!activeInput) return;
        activeInput.value = item.label;
        activeInput.dataset.value = item.value;

        activeInput.dispatchEvent(new Event("input", { bubbles: true }));
        activeInput.dispatchEvent(new Event("change", { bubbles: true }));

        closeDropdown();
      });

      list.appendChild(btn);
    });
  };

  const filterItems = (items, q) => {
    const query = q.trim().toLowerCase();
    if (!query) return items;
    return items.filter((x) => String(x.label).toLowerCase().includes(query));
  };

  // ========= 4) Open/Close + Position =========
  const positionDropdownUnder = (wrapEl) => {
    const rect = wrapEl.getBoundingClientRect();

    // fixed → نسبت به viewport
    dropdown.style.left = `${rect.left}px`;
    dropdown.style.top = `${rect.bottom + 8}px`;
    dropdown.style.width = `${rect.width}px`;
  };

  const openDropdown = async (wrapEl) => {
    const key = wrapEl.getAttribute("data-dd-key");
    const input = wrapEl.querySelector("[data-dd-input]");

    if (!key || !input) return;

    const cfg = ddConfigs[key];
    if (!cfg) return;

    activeWrap = wrapEl;
    activeInput = input;
    activeKey = key;

    positionDropdownUnder(wrapEl);

    dropdown.classList.remove("panel-hidden");

    // سرچ
    search.value = "";
    search.placeholder = cfg.searchPlaceholder || "جستجو...";
    search.focus();

    // دیتا
    const items = await getItemsForKey(key);
    renderList(items);
  };

  const closeDropdown = () => {
    dropdown.classList.add("panel-hidden");
    activeWrap = null;
    activeInput = null;
    activeKey = null;
  };

  // با اسکرول/ریسایز اگر باز بود، جای dropdown آپدیت بشه
  const smartReposition = () => {
    if (!activeWrap || dropdown.classList.contains("panel-hidden")) return;
    positionDropdownUnder(activeWrap);
  };
  window.addEventListener("scroll", smartReposition, true);
  window.addEventListener("resize", smartReposition);

  // ========= 5) Event Delegation =========
  document.addEventListener("click", async (e) => {
    // اگر کلیک داخل خود dropdown بود، کاری نکن
    if (e.target.closest("#sharedDropdown")) return;

    const wrap = e.target.closest("[data-dd-key]");
    if (!wrap) {
      // کلیک بیرون → ببند
      if (!dropdown.classList.contains("panel-hidden")) closeDropdown();
      return;
    }

    // اگر روی همون active کلیک شد → toggle
    if (wrap === activeWrap && !dropdown.classList.contains("panel-hidden")) {
      closeDropdown();
      return;
    }

    await openDropdown(wrap);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDropdown();
  });

  search.addEventListener("input", async () => {
    if (!activeKey) return;
    const items = await getItemsForKey(activeKey);
    renderList(filterItems(items, search.value));
  });
});