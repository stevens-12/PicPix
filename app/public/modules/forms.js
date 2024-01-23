/**
 * Module for handling form events.
 * @module FormEvents
 */

// Selectors for various elements in the DOM
const formOpenBtn = document.querySelector("#open-form");
const formCloseBtn = document.querySelector(".form-close");
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('modal-form');
const pwShowHide = document.querySelectorAll(".eye");
const messageErrorReg = document.getElementsByClassName("error-msg-reg")[0];
const messageErrorLog = document.getElementsByClassName("error-msg-log")[0];
const openLoginLink = document.getElementById('open-login-link');

// Function to initialize form events
export function initializeForm() {

    // Event listener for opening the form
    formOpenBtn.addEventListener("click", () => {
        document.body.classList.toggle("show-popup");
        container.classList.add("show");
    });

    // Event listener for closing the form
    formCloseBtn.addEventListener("click", () => {
        document.body.classList.remove("show-popup");
        container.classList.remove("show");
    });

    // Event listeners for switching between sign up and sign in forms
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    // Event listeners for switching between sign up and sign in forms
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            formCloseBtn.click();
        }
    });

    // Function to toggle password visibility
    const togglePasswordVisibility = (icon) => {
        const input = icon.parentElement.querySelector("input");
        if (input.type === "password") {
            input.type = "text";
            icon.name = icon.name.toLowerCase().replace("eye-outline", "eye-off-outline");
        } else {
            input.type = "password";
            icon.name = icon.name.toLowerCase().replace("eye-off-outline", "eye-outline");
        }
    }

    // Attach event listeners to password visibility icons
    pwShowHide.forEach((icon) => {
        icon.addEventListener("click", () => togglePasswordVisibility(icon));
    });

    // Function to remove active class from right panel
    function removeRightPanelActive() {
        container.classList.remove("right-panel-active");
    }

    //TODO: Encrypt user data by preventing the browser from storing it in the cache and network payload.
    // Event listener for form submission
    document.getElementById("register-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const user = document.getElementById('User').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('Password').value;
        console.log(user, email, password);
        const res = await fetch("http://localhost:4000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: user,
                email: email,
                password: password
            })
        });
        if (!res.ok) return messageErrorReg.classList.toggle("hidden-msg", false);
        const resJson = await res.json();
        if (resJson.status === "ok") {
            removeRightPanelActive();
            messageErrorReg.classList.toggle("hidden-msg", true);
            document.getElementById("register-form").reset();
        }
    });

    // Event listener for login form submission
    document.getElementById("login-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const user = document.getElementById('user').value;
        const password = document.getElementById('password').value;
        const res = await fetch("http://localhost:4000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user, password
            })
        });
        if (!res.ok) return messageErrorLog.classList.toggle("hidden-msg", false);
        const resJson = await res.json();
        if (resJson.redirect) {
            window.location.href = resJson.redirect;
        }
    })

    // Event listener for opening the login form
    openLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        formOpenBtn.click();
    });
}