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

document.addEventListener("DOMContentLoaded", function() {
  // فیلدهای فارسی
  const persianInputs = document.querySelectorAll('#firstNamePersian, #lastNamePersian');
  // فیلدهای لاتین
  const latinInputs = document.querySelectorAll('#firstNameLatin, #lastNameLatin');
  // فیلد کد ملی
  const numericInputs = document.querySelectorAll('#nationalCode');

  // اعمال Validation برای ورودی‌های فارسی
  persianInputs.forEach(input => {
      input.addEventListener('input', function() {
          validatePersian(this);
      });
  });

  // اعمال Validation برای ورودی‌های لاتین
  latinInputs.forEach(input => {
      input.addEventListener('input', function() {
          validateLatin(this);
      });
  });

  // اعمال Validation برای ورودی‌های عددی
  numericInputs.forEach(input => {
      input.addEventListener('input', function() {
          validateNumeric(this);
      });
  });

  // باز کردن پاپ‌آپ
  document.getElementById('openPassengerModal').addEventListener('click', function() {
      document.getElementById('passengerModal').classList.remove('hidden');
  });

  // بستن پاپ‌آپ
  document.getElementById('closePassengerModal').addEventListener('click', function() {
      document.getElementById('passengerModal').classList.add('hidden');
  });
});

// تایید ورودی‌های فارسی (فقط فارسی مجاز است)
function validatePersian(input) {
  input.value = input.value.replace(/[^ء-ي\s]/g, ''); // فقط کاراکترهای فارسی و فاصله مجاز است
}

// تایید ورودی‌های لاتین (فقط لاتین مجاز است)
function validateLatin(input) {
  input.value = input.value.replace(/[^a-zA-Z\s]/g, ''); // فقط حروف لاتین و فاصله مجاز است
}

// تایید کد ملی (فقط اعداد مجاز هستند)
function validateNumeric(input) {
  input.value = input.value.replace(/[^0-9]/g, ''); // فقط اعداد مجاز هستند
}

document.addEventListener("DOMContentLoaded", function() {
  const openDobPopupButton = document.getElementById('dobInput');
  const openPassportExpiryPopupButton = document.getElementById('passportExpiryInput');
  const closeDatePopupButton = document.getElementById('closeDatePopup');
  const datePopup = document.getElementById('datePopup');
  const gregorianBtn = document.getElementById('gregorianBtn');
  const jalaliBtn = document.getElementById('jalaliBtn');
  const daySelect = document.getElementById('day');
  const monthSelect = document.getElementById('month');
  const yearSelect = document.getElementById('year');
  const selectDateBtn = document.getElementById('selectDateBtn');

  let currentDateType = 'gregorian'; // پیش‌فرض میلادی
  let targetInputField = null; // این برای مشخص کردن اینکه تاریخ مربوط به کدام فیلد است

  // تاریخ‌های میلادی
  const gregorianDates = {
      months: ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'],
      days: Array.from({ length: 31 }, (_, i) => i + 1),
      years: Array.from({ length: 100 }, (_, i) => 1923 + i) // از 1923 تا 2022
  };

  // تاریخ‌های شمسی (برای مثال)
  const jalaliDates = {
      months: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      days: Array.from({ length: 31 }, (_, i) => i + 1),
      years: Array.from({ length: 100 }, (_, i) => 1400 + i) // از 1400 تا 1500
  };

  // باز کردن پاپ‌آپ تاریخ تولد
  openDobPopupButton.addEventListener('click', () => {
      targetInputField = 'dobInput'; // مشخص کردن تاریخ تولد
      datePopup.classList.remove('hidden');
      updateDateSelectors();
  });

  // باز کردن پاپ‌آپ تاریخ انقضای پاسپورت
  openPassportExpiryPopupButton.addEventListener('click', () => {
      targetInputField = 'passportExpiryInput'; // مشخص کردن تاریخ انقضا
      datePopup.classList.remove('hidden');
      updateDateSelectors();
  });

  // بستن پاپ‌آپ
  closeDatePopupButton.addEventListener('click', () => {
      datePopup.classList.add('hidden');
  });

  // سوئیچ بین تاریخ میلادی و شمسی
  gregorianBtn.addEventListener('click', () => {
      currentDateType = 'gregorian';
      updateDateSelectors();
  });

  jalaliBtn.addEventListener('click', () => {
      currentDateType = 'jalali';
      updateDateSelectors();
  });

  // به‌روزرسانی انتخاب‌های تاریخ
  function updateDateSelectors() {
      let dates;
      if (currentDateType === 'gregorian') {
          dates = gregorianDates;
      } else {
          dates = jalaliDates;
      }

      // ماه‌ها
      monthSelect.innerHTML = '<option>ماه</option>';
      dates.months.forEach((month, index) => {
          const option = document.createElement('option');
          option.value = index + 1;
          option.textContent = month;
          monthSelect.appendChild(option);
      });

      // روزها
      daySelect.innerHTML = '<option>روز</option>';
      dates.days.forEach(day => {
          const option = document.createElement('option');
          option.value = day;
          option.textContent = day;
          daySelect.appendChild(option);
      });

      // سال‌ها
      yearSelect.innerHTML = '<option>سال</option>';
      dates.years.forEach(year => {
          const option = document.createElement('option');
          option.value = year;
          option.textContent = year;
          yearSelect.appendChild(option);
      });
  }

  // انتخاب تاریخ
  selectDateBtn.addEventListener('click', () => {
      const selectedDay = daySelect.value;
      const selectedMonth = monthSelect.value;
      const selectedYear = yearSelect.value;

      if (selectedDay && selectedMonth && selectedYear) {
          const selectedDate = `${selectedDay} ${selectedMonth} ${selectedYear}`;
          // انتقال تاریخ به فیلد مربوطه
          const targetField = document.getElementById(targetInputField);
          if (targetField) {
              targetField.value = selectedDate;
              datePopup.classList.add('hidden'); // بستن پاپ‌آپ
          } else {
              console.error('فیلد مورد نظر برای تاریخ یافت نشد');
          }
      } else {
          alert('لطفاً تاریخ را کامل وارد کنید.');
      }
  });
});
