/**
 * Image Module: Handles image management including download, display, and hide functionalities.
 * @module Images
 */

// Importing the API key from the environment variables
import { apiKey } from './env.js';

// Selecting DOM elements
export const imageWrapper = document.querySelector(".images");
export const searchInput = document.querySelector(".search input");
export const loadMoreBtn = document.querySelector(".gallery .load-more");
export const lightbox = document.querySelector(".lightbox");
export const downloadImgBtn = lightbox.querySelector(".icon-download");
export const closeImgBtn = lightbox.querySelector(".close-icon");

// Setting up constants
export const perPage = 30;
export let currentPage = 1;
export let searchTerm = null;


/**
 * Function to download an image given its URL.
 * @param {string} imgUrl - The URL of the image to be downloaded.
 */
export const downloadImg = (imgUrl) => {
    // Converting received img to blob, creating its download link, & downloading it
    fetch(imgUrl).then(res => res.blob()).then(blob => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = new Date().getTime();
        a.click();
    }).catch(() => alert("Failed to download image!"));
}

/**
 * Function to show the lightbox with the given image and name.
 * @param {string} name - The name of the image.
 * @param {string} img - The URL of the image.
 */
export const showLightbox = (name, img,) => {
    // Showing lightbox and setting img source, name and button attribute
    lightbox.querySelector("img").src = img;
    lightbox.querySelector("span").innerText = name;
    downloadImgBtn.setAttribute("data-img", img);
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}

/**
 * Function to hide the lightbox.
 */
export const hideLightbox = () => {
    // Hiding lightbox on close icon click
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
}

let loadedImages = [];


/**
 * Function to generate HTML for the given images and add them to the image wrapper.
 * @param {Array} images - An array of image objects.
 */
export const generateHTML = (images) => {
    // Making li of all fetched images and adding them to the existing image wrapper
    images.forEach(img => {
        // Check if image already exists in imageWrapper
        if (!loadedImages.includes(img.src.large2x)) {
            loadedImages.push(img.src.large2x);
            imageWrapper.insertAdjacentHTML('beforeend', `
            <li class="card">
                <img onclick="window.showLightbox('${img.photographer}', '${img.src.large2x}')" src="${img.src.large2x}" alt="${img.photographer}">
                <div class="details">
                <div class="photographer">
                    <ion-icon name="camera-outline"></ion-icon>
                    <span>${img.photographer}</span>
                </div>
                    <button onclick="window.downloadImg('${img.src.large2x}');">
                        <ion-icon name="cloud-download-outline" class="btn icon-download"></ion-icon>
                    </button>
                </div>
            </li>
        `);
        }
    });
}

/**
 * Function to fetch images from the API and generate their HTML.
 * @param {string} apiURL - The URL of the API endpoint to fetch images from.
 */
export const getImages = (apiURL) => {
    // Fetching images by API call with authorization header
    searchInput.blur();
    loadMoreBtn.innerText = "Loading...";
    loadMoreBtn.classList.add("disabled");
    fetch(apiURL, {
        headers: { Authorization: apiKey }
    }).then(res => res.json()).then(data => {
        generateHTML(data.photos);
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.classList.remove("disabled");
    }).catch(() => alert("Failed to load images!"));
}

/**
 * Function to load more images when the "Load More" button is clicked.
 */
export const loadMoreImages = () => {
    currentPage++; // Increment currentPage by 1
    // If searchTerm has some value then call API with search term else call default API
    let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    apiUrl = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiUrl;
    getImages(apiUrl);
}

/**
 * Function to handle the search input event.
 * @param {Event} e - The event object.
 */
export const loadSearchImages = (e) => {
    // If the search input is empty, set the search term to null and return from here
    if (e.target.value === "") return searchTerm = null;
    // If pressed key is Enter, update the current page, search term & call the getImages
    if (e.key === "Enter") {
        currentPage = 1;
        searchTerm = e.target.value;
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=1&per_page=${perPage}`);
        imageWrapper.innerHTML = "";
    }
}

// Initializing the image loading
getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeImgBtn.addEventListener("click", hideLightbox);