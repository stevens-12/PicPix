/**
 * Navigation Module: This module manages the behavior of the navigation bar and mobile menu.
 * @module Navigation
 */

// DOM Elements
const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");
const menuLinks = document.querySelectorAll('.links a');

/**
 * Function to adjust the navigation bar according to scrolling.
 * @function handleScrollEvents
 */
export function handleScrollEvents() {
    const nav = document.querySelector(".navbar");

    // Adjust navbar class based on scroll position
    window.addEventListener("scroll", () => {
        let scrollingCurrent = window.scrollY;
        if (scrollingCurrent > 80 && scrollingCurrent <= 500) {
            nav.classList.remove("fixed");
        } else if (scrollingCurrent >= 500) {
            nav.classList.add("fixed");
        }
    });
}

/**
 * Function to move the search input on scroll.
 * @function moveSearchInputOnScroll
 */

// FIXME: When a search is performed from the navbar the interaction with the handleScrollEvents() function is affected.
export function moveSearchInputOnScroll() {
    var searchInput = document.getElementsByClassName('search-box')[0];
    var navbar = document.getElementsByClassName('search-navbar')[0];
    var originalParent = searchInput.parentNode;

    // Define the scroll position at which the search input should be moved
    var threshold = 500;
    var margin = 1;

    // Event listener for scroll event
    window.addEventListener('scroll', function () {
        var currentScrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

        // Move search input based on scroll position
        if (currentScrollPosition >= threshold + margin && !navbar.contains(searchInput)) {
            if (originalParent.contains(searchInput)) {
                originalParent.removeChild(searchInput);
            }
            navbar.insertBefore(searchInput, navbar.firstChild);
        } else if (currentScrollPosition < threshold - margin && originalParent.contains(searchInput)) {
            if (navbar.contains(searchInput)) {
                navbar.removeChild(searchInput);
            }
            originalParent.appendChild(searchInput);
        } else if (currentScrollPosition < threshold + margin && !originalParent.contains(searchInput)) {
            if (navbar.contains(searchInput)) {
                navbar.removeChild(searchInput);
            }
            originalParent.appendChild(searchInput);
        }
    });
}

/**
 * Function to control the behavior of the hamburger menu.
 * @function mobileMenu
 */
export function mobileMenu() {
    try {
        // Event listeners for hamburger button click
        hamburgerBtn.addEventListener("click", () => {
            navbarMenu.classList.toggle("show-menu");
        });

        hideMenuBtn.addEventListener("click", () => {
            hamburgerBtn.click();
        });

        // Event listeners for menu links click
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarMenu.classList.remove("show-menu");
            });
        });
    } catch (error) {
        console.error(error);
    }
}