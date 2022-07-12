"use strict";

// DOM Declarations
const toggle = document.querySelector(".nav__label");
const menu = document.querySelector(".nav__container--left");
const checkbox = document.querySelector(".nav__checkbox");
// const nav = document.querySelector(".nav__links");
const button = document.querySelector(".project__button");
const nav = document.querySelector(".nav");
const bioSection = document.querySelector("#bio-section");
const projectSection = document.querySelector("#project-section");
const contactSection = document.querySelector("#contact-section");
const header = document.querySelector(".header");
const introTree = document.querySelector(".intro__tree");

///////////////////////////////////////////////////////////
// NAVBAR

// Sticky navigation
const navHeight = nav.getBoundingClientRect();

window.addEventListener("scroll", function () {
  if (window.scrollY > navHeight.top) nav.classList.add("nav__sticky");
  else nav.classList.remove("nav__sticky");
});

// Smooth scroll
// Event listener attached to parent element of all elements.
// Add event listener to common parent element
// Determine what element originated the event

document.querySelector(".nav__list").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    checkbox.checked = false;
    const smoothScroll = function () {
      const id = e.target.getAttribute("href");

      // Determine section coordinates
      const bioCoords = bioSection.getBoundingClientRect();
      const projectCoords = projectSection.getBoundingClientRect();
      const contactCoords = contactSection.getBoundingClientRect();

      // Define header offset
      const headerOffset = 120;

      // Determine scroll position
      let bioPosition = bioSection.getBoundingClientRect().top;
      let bioOffsetPosition = bioPosition + window.pageYOffset - headerOffset;

      let projectPosition = projectSection.getBoundingClientRect().top;
      let projectOffsetPosition =
        projectPosition + window.pageYOffset - headerOffset;

      let contactPosition = contactSection.getBoundingClientRect().top;
      let contactOffsetPosition =
        contactPosition + window.pageYOffset - headerOffset;

      // Smooth scroll to desired section
      if (id.includes("bio")) {
        window.scrollTo({
          left: bioCoords.left + window.pageXOffset,
          top: bioOffsetPosition,
          behavior: "smooth",
        });
      } else if (id.includes("project")) {
        window.scrollTo({
          left: projectCoords.left + window.pageXOffset,
          top: projectOffsetPosition,
          behavior: "smooth",
        });
      } else if (id.includes("contact")) {
        window.scrollTo({
          left: contactCoords.left + window.pageXOffset,
          top: contactOffsetPosition,
          behavior: "smooth",
        });
      }
    };
    // Scroll after 0.8s
    setTimeout(smoothScroll, 800);
  }
});

// Typewriter Effect
const textDisplay = document.querySelector(".intro__welcome-text");
const phrases = [
  "Hi, I'm Cillin.",
  "Welcome to my portfolio :)",
  "You can contact me below.",
  "Have a great day!",
  "P.S",
  "Why did the programmer quit?",
  "Because he didn't get arrays..",
];

let i = 0;
let j = 0;
let currentPhrase = [];
let isEnd = false;
let isDeleting = false;

// Loop through array
function loop() {
  isEnd = false;
  textDisplay.innerHTML = currentPhrase.join("");

  // Loop through sentences
  if (i < phrases.length) {
    // Loop through letters
    if (!isDeleting && j <= phrases[i].length) {
      // Printing letters
      currentPhrase.push(phrases[i][j]);
      j++;
      textDisplay.innerHTML = currentPhrase.join("");
    }

    if (isDeleting && j <= phrases[i].length) {
      // Deleting letters
      currentPhrase.pop(phrases[i][j]);
      j--;
      textDisplay.innerHTML = currentPhrase.join("");
    }

    if (j == phrases[i].length) {
      isEnd = true;
      isDeleting = true;
    }

    // Moving to next sentence
    if (isDeleting && j === 0) {
      currentPhrase = [];
      isDeleting = false;
      i++;
      if (i == phrases.length) {
        i = 0;
      }
    }
  }
  const spedUp = Math.random() * (80 - 50) + 50;
  const normalSpeed = Math.random() * (200 - 100) + 100;
  const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed;

  // Letter printing timer
  setTimeout(loop, time);
}

loop();

///////////////////////////////////////////////////////////
// BIO
const observerLeft = new IntersectionObserver((entries) => {
  // Loop over the entries
  entries.forEach((entry) => {
    // If the element is visible
    if (entry.isIntersecting) {
      // Add the animation class
      entry.target.classList.add("leftAnimation");
    }
  });
});

const observerRight = new IntersectionObserver((entries) => {
  // Loop over the entries
  entries.forEach((entry) => {
    // If the element is visible
    if (entry.isIntersecting) {
      // Add the animation class
      entry.target.classList.add("rightAnimation");
    }
  });
});

// Assign animations to cols
observerLeft.observe(document.querySelector(".bio__text-1"));
observerRight.observe(document.querySelector(".bio__icon-1"));
observerLeft.observe(document.querySelector(".bio__icon-2"));
observerRight.observe(document.querySelector(".bio__text-2"));
observerLeft.observe(document.querySelector(".bio__text-3"));
observerRight.observe(document.querySelector(".bio__icon-3"));

///////////////////////////////////////////////////////////
// CAROUSEL

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Dot navigation
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("carousel__slides");
  let dots = document.getElementsByClassName("carousel__dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-dot", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active-dot";
}
