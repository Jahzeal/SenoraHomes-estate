let slideIndex = 0;
const delay = 2000;
let slideTimer;

// --- Core Functionality ---
function showSlides() {
  let slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return; // ⛔ Skip if no slides

  slides.forEach((slide) => (slide.style.display = "none"));
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].style.display = "block";
}

function startAutoSlide() {
  const slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return; // ⛔ Skip if no slides
  if (!slideTimer) slideTimer = setInterval(showSlides, delay);
}

function stopAutoSlide() {
  clearInterval(slideTimer);
  slideTimer = null;
}

// ✅ Only run slider logic if slides exist
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  if (slides.length > 0) {
    showSlides();
    startAutoSlide();

    const heroSlider = document.querySelector(".hero-slider");
    if (heroSlider) {
      heroSlider.addEventListener("mouseenter", stopAutoSlide);
      heroSlider.addEventListener("mouseleave", startAutoSlide);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // to play
  const thumbnail = document.getElementById("thumbnail");
  if (thumbnail) {
    thumbnail.addEventListener("click", function () {
      this.outerHTML = `
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/C3LzJoHkS6Q?autoplay=1"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>`;
    });
  }


// --- Modal Setup ---
const brochureModal = document.getElementById("brochureModal");
const inquireModal = document.getElementById("inquireModal");

// Function to open modal based on type
function openModal(type) {
  if (type === "brochure" && brochureModal) {
    brochureModal.style.display = "flex";
  } else if (type === "inquire" && inquireModal) {
    inquireModal.style.display = "flex";
  }
}

// Function to close all modals
function closeModal() {
  if (brochureModal) brochureModal.style.display = "none";
  if (inquireModal) inquireModal.style.display = "none";
}

// Attach event listeners to open buttons
const inquireBtn = document.querySelector(".inquire-btn");
const brochureBtn = document.querySelector(".brochure-btn");

if (inquireBtn) inquireBtn.addEventListener("click", () => openModal("inquire"));
if (brochureBtn) brochureBtn.addEventListener("click", () => openModal("brochure"));

// Attach event listeners to close buttons
const closeBtns = document.querySelectorAll(".close-btn");
closeBtns.forEach((btn) => btn.addEventListener("click", closeModal));

// Close modal when clicking outside the content
window.addEventListener("click", (e) => {
  if (e.target === brochureModal || e.target === inquireModal) {
    closeModal();
  }
});

  // humburger
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    const navItems = document.querySelectorAll(".nav-item a");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            }
        });
    });
  }
});
