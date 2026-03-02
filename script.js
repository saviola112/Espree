const propertySelect = document.getElementById("property");
const totalDisplay = document.getElementById("total");

propertySelect.addEventListener("change", function () {
  totalDisplay.innerText = propertySelect.value;
});

function payNow() {
  const email = document.getElementById("email").value;
  const amount = document.getElementById("property").value;
  const seventyPercent = amount * 0.7;

  var handler = PaystackPop.setup({
    key: "YOUR_PUBLIC_KEY",
    email: email,
    amount: seventyPercent * 100,
    currency: "NGN",
    callback: function (response) {
      alert("Payment successful! Booking confirmed.");
    },
  });

  handler.openIframe();
}
