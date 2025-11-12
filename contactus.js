// Include the EmailJS script in your HTML before this script
// <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>

emailjs.init("miExEKFpZDx4Vqjyq"); // your public key

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const country = document.getElementById("country").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    emailjs
      .send("service_tr72xyq", "template_yt9eqxt", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        country: country,
        phone: phone,
        message: message,
      })
      .then(() => {
        alert("✅ Message sent successfully!");
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Failed to send message. Please try again.");
      });
  });
});


