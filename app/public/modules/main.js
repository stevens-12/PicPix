// Navbar functions
import {
    handleScrollEvents,
    scrollAndFocus,
    mobileMenu
} from './navbar.js';

const searchButton = document.querySelector('.nav-search-btn');
searchButton.addEventListener('click', () => {
    scrollAndFocus('search-engine');
});

handleScrollEvents();
mobileMenu();


// Forms functions
import {
    initializeForm,
} from './forms.js'

initializeForm();



// Gallery functions
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
} from './gallery.js';

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeImgBtn.addEventListener("click", hideLightbox);

if (!downloadImgBtn.hasAttribute('data-event-attached')) {
    downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));
    downloadImgBtn.setAttribute('data-event-attached', 'true');
}

window.showLightbox = showLightbox;
window.downloadImg = downloadImg;