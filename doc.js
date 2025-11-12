emailjs.init("miExEKFpZDx4Vqjyq"); // your Public Key

document.addEventListener("DOMContentLoaded", function () {
  const brochureForm = document.getElementById("brochureForm");

  if (brochureForm) {
    brochureForm.addEventListener("submit", function (e) {
      e.preventDefault();

      emailjs
        .send("service_tr72xyq", "template_8jx2fug", {
          first_name: brochureForm.full_name.value,
          email: brochureForm.email.value,
          phone: brochureForm.phone.value,
          message: "New brochure request from SenoraHomes website",
        })
        .then(() => {
          alert("✅ Brochure request sent successfully!");
          brochureForm.reset();
        })
        .catch((err) => {
          console.error(err);
          alert("❌ Failed to send brochure request. Please try again.");
        });
    });
  }
});

