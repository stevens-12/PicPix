// Selectors
const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");
const menuLinks = document.querySelectorAll('.links a');

// Function to move the navigation bar according to scrolling
export function handleScrollEvents() {
    const nav = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        let scrollingCurrent = window.scrollY;
        if (scrollingCurrent > 80 && scrollingCurrent <= 500) {
            nav.classList.remove("fixed");
        } else if (scrollingCurrent >= 500) {
            nav.classList.add("fixed");
        }
    });
}

export function moveSearchInputOnScroll() {
    var searchInput = document.getElementsByClassName('search-box')[0];
    var navbar = document.getElementsByClassName('search-navbar')[0];
    var originalParent = searchInput.parentNode;
    var threshold = 500; // Define the scroll position at which the search input should be moved
    var margin = 1; // Define a small margin

    window.addEventListener('scroll', function () {
        var currentScrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

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