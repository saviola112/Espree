const propertySelect = document.getElementById("property");
const totalDisplay = document.getElementById("total");
(function () {
  const toggleBtn = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }

  propertySelect.addEventListener("change", function () {
    totalDisplay.innerText = propertySelect.value;
  });
  const yearEls = document.querySelectorAll("[data-year]");
  const year = new Date().getFullYear();
  yearEls.forEach((el) => (el.textContent = year));

  function payNow() {
    const email = document.getElementById("email").value;
    const amount = document.getElementById("property").value;
    const seventyPercent = amount * 0.7;
    const packageSelect = document.getElementById("package");
    const totalDisplay = document.getElementById("estimated-total");
    const depositDisplay = document.getElementById("estimated-deposit");

    var handler = PaystackPop.setup({
      key: "YOUR_PUBLIC_KEY",
      email: email,
      amount: seventyPercent * 100,
      currency: "NGN",
      callback: function (response) {
        alert("Payment successful! Booking confirmed.");
      },
    });
    const updateEstimate = () => {
      if (!packageSelect || !totalDisplay || !depositDisplay) return;
      const total = Number(packageSelect.value || 0);
      const deposit = Math.round(total * 0.7);
      totalDisplay.textContent = `₦${total.toLocaleString()}`;
      depositDisplay.textContent = `₦${deposit.toLocaleString()}`;
    };

    handler.openIframe();
  }
  if (packageSelect) {
    packageSelect.addEventListener("change", updateEstimate);
    updateEstimate();
  }

  const bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(
        "Thanks for booking with Espree Cleaning Company. We will contact you shortly.",
      );
      bookingForm.reset();
      updateEstimate();
    });
  }
})();
