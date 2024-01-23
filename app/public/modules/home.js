/**
 * Home page module for initializing navbar and forms, and setting up scroll reveal animations.
 * @module Home
 */

// Import mobile menu function from navbar module
import {
    mobileMenu
} from './navbar.js';

// Initialize mobile menu
mobileMenu();


// Import form initialization function from forms module
import {
    initializeForm,
} from './forms.js'

// Initialize form
initializeForm();


// Set up ScrollReveal animation library
const sr = ScrollReveal({
    distance: "90px",
    duration: 3000
})

// Set up animations for home data section
sr.reveal(`.home__data`, { origin: "top", delay: 400 })
// Set up animations for home image section
sr.reveal(`.home__img`, { origin: "bottom", delay: 600 })
// Set up animations for home footer section
sr.reveal(`.home__footer`, { origin: "bottom", delay: 800 })