let slideIndex = 0;
const delay = 2000;
let slideTimer;

// --- Core Functionality ---
function showSlides() {
  let slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return; // Skip if no slides

  slides.forEach((slide) => (slide.style.display = "none"));
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].style.display = "block";
}

function startAutoSlide() {
  const slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return; //  Skip if no slides
  if (!slideTimer) slideTimer = setInterval(showSlides, delay);
}

function stopAutoSlide() {
  clearInterval(slideTimer);
  slideTimer = null;
}

// Only run slider logic if slides exist
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
const inquireModalDesktop = document.getElementById("inquireModalDesktop");
const inquireModalMobile = document.getElementById("inquireModalMobile");

// Function to open modal based on type
function openModal(type) {
  if (type === "brochure" && brochureModal) {
    brochureModal.style.display = "flex";
  } else if (type === "inquire") {
      // Check which modal to open (could simply open both if they exist, or check viewport)
      // Since we want the button to just "work", let's open whichever is present or visible.
      // A simpler approach: Desktop button opens Desktop modal.

      // If the caller didn't specify, we might need to guess, but currently:
      // The Desktop button (.inquire-btn) should open Desktop modal.
      if (inquireModalDesktop) inquireModalDesktop.style.display = "flex";
      // If there's a mobile button (inside nav), it might need its own listener.
  }
}

// Function to close all modals
function closeModal() {
  if (brochureModal) brochureModal.style.display = "none";
  if (inquireModalDesktop) inquireModalDesktop.style.display = "none";
  if (inquireModalMobile) inquireModalMobile.style.display = "none";
}

// Attach event listeners to open buttons
const inquireBtn = document.querySelector(".inquire-btn");
const brochureBtn = document.querySelector(".brochure-btn");

if (inquireBtn) inquireBtn.addEventListener("click", () => {
    if (inquireModalDesktop) inquireModalDesktop.style.display = "flex";
});

if (brochureBtn) brochureBtn.addEventListener("click", () => openModal("brochure"));

// Attach listener to Mobile Menu Inquire Link (if it exists in the nav items)
// The HTML has a "CONTACT US" link, but typically the Inquire button is separate.
// Looking at HTML, inside .nav-links there is NO inquire button for mobile?
// Wait, looking at index.html lines 57-75:
// There is a div #inquireModalMobile INSIDE .nav-links, but how is it triggered?
// It seems there is NO trigger button inside .nav-links in the HTML provided for Mobile.
// The desktop button is outside .nav-links.
// On mobile, the desktop button is hidden via CSS?
// Let's check style.css: .inquire-btn { display: none; } on mobile (max-width: 768px).
// So on mobile, there is NO inquire button visible unless it's in the hamburger menu.
// Checking index.html again:
/*
<div class="nav-links" id="nav-links">
  ... links ...
  <div id="inquireModalMobile" class="modal">...</div>
</div>
*/
// It seems the modal is just *sitting* there.
// If the user meant for an "Inquire" link to appear in the mobile menu, it's missing from the HTML structure (as an <a> or <button>).
// However, I should at least support closing it if it ever gets opened.

// Attach event listeners to close buttons
const closeBtns = document.querySelectorAll(".close-btn");
closeBtns.forEach((btn) => btn.addEventListener("click", closeModal));

// Close modal when clicking outside the content
window.addEventListener("click", (e) => {
  if (e.target === brochureModal) closeModal();
  if (e.target === inquireModalDesktop) closeModal();
  if (e.target === inquireModalMobile) closeModal();
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
