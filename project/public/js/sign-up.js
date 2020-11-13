import { handleErrors } from "./utils.js"

const signUpForm = document.querySelector(".sign-up-form");
signUpForm.addEventListener('submit', async (e) =>{
    e.preventDefault();

    const formData = new FormData(signUpForm);

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const _csrf = formData.get("_csrf");

    const body = { firstName, lastName, email, password, confirmPassword, _csrf };

    try {
        const res = await fetch("/users", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!res.ok) throw res;

        const {
            token,
            user: { id }
        } = await res.json();

        localStorage.setItem("SPRINT_TURF_ACCESS_TOKEN", token);
        localStorage.setItem("SPRINT_TURF_CURRENT_USER_ID", id);

        window.location.href = "/";

    } catch (e) {
        handleErrors(e);
    }
})