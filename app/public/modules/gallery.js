/**
 * Module for gallery form events.
 * @module Gallery
 */

// Import navbar functions
import {
    handleScrollEvents,
    mobileMenu,
    moveSearchInputOnScroll
} from './navbar.js';

// Initialize navbar functions
handleScrollEvents();
mobileMenu();
moveSearchInputOnScroll();

// Import gallery functions
import {
    searchInput,
    loadMoreBtn,
    downloadImgBtn,
    closeImgBtn,
    perPage,
    currentPage,
    downloadImg,
    showLightbox,
    hideLightbox,
    getImages,
    loadMoreImages,
    loadSearchImages
} from './images.js';

// Fetch initial images
getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
// Attach event listeners to buttons
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeImgBtn.addEventListener("click", hideLightbox);

// Attach event listener to download button if not already attached
if (!downloadImgBtn.hasAttribute('data-event-attached')) {
    downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));
    downloadImgBtn.setAttribute('data-event-attached', 'true');
}

// Expose functions globally
window.showLightbox = showLightbox;
window.downloadImg = downloadImg;


// Log out functionality
document.getElementsByClassName("log-out")[0].addEventListener("click", () => {
    // Clear JWT cookie
    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // Redirect to home page
    document.location.href = "/"
})