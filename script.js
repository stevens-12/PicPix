// Gallery and lightbox constant declarations
const imageWrapper = document.querySelector(".images"),
    searchInput = document.querySelector(".search input"),
    loadMoreBtn = document.querySelector(".gallery .load-more"),
    lightbox = document.querySelector(".lightbox"),
    downloadImgBtn = lightbox.querySelector(".uil-import"),
    closeImgBtn = lightbox.querySelector(".close-icon");

// Login & Register constant declarations
const navbarMenu = document.querySelector(".navbar .links"),
    hamburgerBtn = document.querySelector(".hamburger-btn"),
    hideMenuBtn = navbarMenu.querySelector(".close-btn"),
    formOpenBtn = document.querySelector("#form-open"),
    modal_form = document.querySelector(".modal_form"),
    formContainer = document.querySelector(".form_container"),
    formCloseBtn = document.querySelector(".form_close"),
    signupBtn = document.querySelector("#signup"),
    loginBtn = document.querySelector("#login"),
    showPopupBtn = document.querySelector(".login-btn"),
    pwShowHide = document.querySelectorAll(".pw_hide");

// Functions for the login and registration modal window and blur effect on its activation.

// Full body blur effect after activation of the login modal window.
formOpenBtn.addEventListener("click", () => document.body.classList.toggle("show-popup"));
formCloseBtn.addEventListener("click", () => document.body.classList.remove("show-popup"));

// Opens and closes the login and sing up modal window.
formOpenBtn.addEventListener("click", () => modal_form.classList.add("show"));
formCloseBtn.addEventListener("click", () => modal_form.classList.remove("show"));

// Function that adds a click event listener to show or hide the password in the password field. When the user clicks the icon, the password will be displayed in plain text. When the user clicks the icon again, the password will be hidden.
pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if (getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("uil-eye-slash", "uil-eye");
        } else {
            getPwInput.type = "password";
            icon.classList.replace("uil-eye", "uil-eye-slash");
        }
    });
});

// Show and hide mobile menu
hamburgerBtn.addEventListener("click", () => { navbarMenu.classList.toggle("show-menu");});
hideMenuBtn.addEventListener("click", () =>  hamburgerBtn.click());

// Activation of the login and Sign up buttons to receive the form or hide it.
signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.remove("active");
});


// API key, pagination, searchTerm variables
const apiKey = "WtRCh5VHR4XAFfCpbR9jfhrsRL1x91i4PVASrOCWl4AQnDOc6tu7L0Ew";
const perPage = 30;
let currentPage = 1;
let searchTerm = null;
const downloadImg = (imgUrl) => {
    // Converting received img to blob, creating its download link, & downloading it
    fetch(imgUrl).then(res => res.blob()).then(blob => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = new Date().getTime();
        a.click();
    }).catch(() => alert("Failed to download image!"));
}
const showLightbox = (name, img,) => {
    // Showing lightbox and setting img source, name and button attribute
    lightbox.querySelector("img").src = img;
    lightbox.querySelector("span").innerText = name;
    downloadImgBtn.setAttribute("data-img", img);
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}
const hideLightbox = () => {
    // Hiding lightbox on close icon click
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
}
const generateHTML = (images) => {
    // Making li of all fetched images and adding them to the existing image wrapper
    imageWrapper.innerHTML += images.map(img =>
        `<li class="card">
            <img onclick="showLightbox('${img.photographer}', '${img.src.large2x}')" src="${img.src.large2x}" alt="img">
            <div class="details">
                <div class="photographer">
                    <i class="uil uil-camera"></i>
                    <span>${img.photographer}</span>
                </div>
                <button onclick="downloadImg('${img.src.large2x}');">
                    <i class="uil uil-import"></i>
                </button>
            </div>
        </li>`
    ).join("");
}
const getImages = (apiURL) => {
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
const loadMoreImages = () => {
    currentPage++; // Increment currentPage by 1
    // If searchTerm has some value then call API with search term else call default API
    let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    apiUrl = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiUrl;
    getImages(apiUrl);
}
const loadSearchImages = (e) => {
    // If the search input is empty, set the search term to null and return from here
    if (e.target.value === "") return searchTerm = null;
    // If pressed key is Enter, update the current page, search term & call the getImages
    if (e.key === "Enter") {
        currentPage = 1;
        searchTerm = e.target.value;
        imageWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=1&per_page=${perPage}`);
    }
}
getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeImgBtn.addEventListener("click", hideLightbox);
downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));
