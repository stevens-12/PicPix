// Declarar variables al inicio
const formOpenBtn = document.querySelector("#open-form");
const formCloseBtn = document.querySelector(".form-close");
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('modal-form');
const pwShowHide = document.querySelectorAll(".eye");

export function initializeForm() {
    // Agrupar listeners
    formOpenBtn.addEventListener("click", () => {
        document.body.classList.toggle("show-popup");
        container.classList.add("show");
    });

    formCloseBtn.addEventListener("click", () => {
        document.body.classList.remove("show-popup");
        container.classList.remove("show");
    });

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            formCloseBtn.click(); // Simula un clic en el botón de cerrar
        }
    });


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

    // Iterar icons para toggle visibility
    pwShowHide.forEach((icon) => {
        icon.addEventListener("click", () => togglePasswordVisibility(icon));
    });

}