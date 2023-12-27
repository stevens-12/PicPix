// Declarar variables al inicio
const formOpenBtn = document.querySelector("#form-open");
const formCloseBtn = document.querySelector(".form_close");
const modalForm = document.querySelector(".modal_form");
const formContainer = document.querySelector(".form_container");
const signupBtn = document.querySelector("#signup");
const loginBtn = document.querySelector("#login");
const pwShowHide = document.querySelectorAll(".pw_hide");

export function initializeForm() {
    // Agrupar listeners
    formOpenBtn.addEventListener("click", () => {
        document.body.classList.toggle("show-popup");
        modalForm.classList.add("show");
    });

    formCloseBtn.addEventListener("click", () => {
        document.body.classList.remove("show-popup");
        modalForm.classList.remove("show");
    });

    // Función para toggle password visibility
    const togglePasswordVisibility = (icon) => {
        const input = icon.parentElement.querySelector("input");
        if (input.type === "password") {
            input.type = "text";
            icon.name = icon.name.toLowerCase().replace("eye-off-outline", "eye-outline");
        } else {
            input.type = "password";
            icon.name = icon.name.toLowerCase().replace("eye-outline", "eye-off-outline");
        }
    }

    // Iterar icons para toggle visibility
    pwShowHide.forEach((icon) => {
        icon.addEventListener("click", () => togglePasswordVisibility(icon));
    });

    // Eventos para mostrar u ocultar formulario
    signupBtn.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.add("active");
    });

    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.remove("active");
    });

}