// Selectors
const nav = document.querySelector("nav");
const navbar = document.getElementById('nav');
const section2 = document.getElementById('search-engine');
const inputSearch = document.getElementById('search-engine');
const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");
const menuLinks = document.querySelectorAll('.links a');

// Function to move the navigation bar according to scrolling
export function handleScrollEvents() {
    let locationMain = window.scrollY;
    const nav = document.querySelector("nav");
    const navbar = document.getElementById('nav');

    window.addEventListener("scroll", () => {
        let scrollingCurrent = window.scrollY;

        if (locationMain >= scrollingCurrent) {
            nav.style.top = "0px";
        } else {
            nav.style.top = "-80px";
        }

        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        locationMain = scrollingCurrent;
    });
}

// Navigation navbar button to activate and redirect to search input.
export function scrollAndFocus() {
    try {
        if (section2 && inputSearch) {
            section2.scrollIntoView({ behavior: 'smooth', block: 'center' });
            inputSearch.focus();
        }
    } catch (error) {
        console.error(error);
    }
}

// Function to control the hamburger menu
export function mobileMenu() {
    try {
        // Show/hide mobile menu
        hamburgerBtn.addEventListener("click", () => {
            navbarMenu.classList.toggle("show-menu");
        });

        hideMenuBtn.addEventListener("click", () => {
            hamburgerBtn.click();
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarMenu.classList.remove("show-menu");
            });
        });
    } catch (error) {
        console.error(error);
    }
}