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
  