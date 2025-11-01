// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//   showSlides((slideIndex += n));
// }

// // Show slide on hover
// const heroSlider = document.querySelector(".hero-slider");
// heroSlider.addEventListener("mouseenter", () => plusSlides(1)); // change on hover

// // Main slide function
// function showSlides(n) {
//   let slides = document.querySelectorAll(".slide");
//   if (n > slides.length) {
//     slideIndex = 1;
//   }
//   if (n < 1) {
//     slideIndex = slides.length;
//   }

//   slides.forEach((slide) => (slide.style.display = "none"));
//   slides[slideIndex - 1].style.display = "block";
// }

let slideIndex = 0; // Start at 0 or 1. If 0, we'll increment first.
const delay = 2000; // Change slide every 3000 milliseconds (3 seconds)
let slideTimer; // Variable to hold the interval ID

// --- Core Functionality ---

// Main slide function - Simplified for auto-slide
function showSlides() {
    let slides = document.querySelectorAll(".slide");
    
    // 1. Hide all slides
    slides.forEach((slide) => (slide.style.display = "none"));

    // 2. Increment the index
    slideIndex++; 

    // 3. Loop back to the first slide if we exceed the count
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // 4. Display the current slide
    slides[slideIndex - 1].style.display = "block";
}

// Function to start the automatic slideshow
function startAutoSlide() {
    // Check if a timer is already running to prevent duplicates
    if (!slideTimer) {
        // Use setInterval to call showSlides every 'delay' milliseconds
        slideTimer = setInterval(showSlides, delay);
    }
}

// Function to stop the automatic slideshow (useful for hover/manual controls)
function stopAutoSlide() {
    clearInterval(slideTimer);
    slideTimer = null; // Reset the timer variable
}

// --- Initial Setup and Interaction ---

// Start the slideshow immediately
// Call showSlides once to display the first slide immediately, then the interval takes over.
showSlides(); 
startAutoSlide(); 

// --- User Interaction Enhancements (Hover) ---

const heroSlider = document.querySelector(".hero-slider");

// Pause the auto-slide when the mouse is over the slider
if (heroSlider) {
    heroSlider.addEventListener("mouseenter", stopAutoSlide);

    // Resume the auto-slide when the mouse leaves the slider
    heroSlider.addEventListener("mouseleave", startAutoSlide);
}


// --- Manual Controls (Next/Previous) - *Optional but helpful* ---

// Keep your existing manual control function
function plusSlides(n) {
    // 1. Stop the auto-slide on manual interaction
    stopAutoSlide(); 
    
    // 2. Adjust the slideIndex based on 'n'
    slideIndex += n;

    // 3. Handle boundary conditions
    let slides = document.querySelectorAll(".slide");
    if (slideIndex > slides.length) {slideIndex = 1;}
    if (slideIndex < 1) {slideIndex = slides.length;}

    // 4. Display the new slide
    slides.forEach((slide) => (slide.style.display = "none"));
    slides[slideIndex - 1].style.display = "block";
    
    // *You might want to restart the timer after a short delay here*
    // *or just let the user re-engage the auto-slide on mouseleave.*
}

// To use plusSlides, you would need buttons in your HTML like:
// <button onclick="plusSlides(1)">Next</button>
// <button onclick="plusSlides(-1)">Previous</button>

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

// form
// Get the modal element
const modal = document.getElementById("brochureModal");
function openModal() {
  const showForm = document.getElementById("brochureModal");
  showForm.style.display = "flex";
}


function closeModal()
{
    const closeForm = document.getElementById("brochureModal");
    closeForm.style.display = "none";
}

window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navLinks = document.querySelector(".nav-links");

  hamburgerMenu.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
});
