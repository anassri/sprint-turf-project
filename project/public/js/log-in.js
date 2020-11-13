import { handleErrors } from "./utils.js"
window.addEventListener("DOMContentLoaded", async (e) => {

  const logIn = document.getElementById("login");
  const demoUser = document.getElementById("demo-user");

  demoUser.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("demo user")
    const email = "email@gmail.com";
    const password = "1234";
    const body = { email, password };

    try {
      const res = await fetch("/users/token", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw res;
      }
      const {
        token,
        user: { id },
      } = await res.json();

      localStorage.setItem("SPRINT_TURF_ACCESS_TOKEN", token);
      localStorage.setItem("SPRINT_TURF_CURRENT_USER_ID", id);

      window.location.href = "/";
    } catch (err) {
      handleErrors(err);
    }

  })


  logIn.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(logIn);
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { email, password };

    try {
      const res = await fetch("/users/token", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw res;
      }
      const {
        token,
        user: { id },
      } = await res.json();

      localStorage.setItem("SPRINT_TURF_ACCESS_TOKEN", token);
      localStorage.setItem("SPRINT_TURF_CURRENT_USER_ID", id);

      window.location.href = "/";
    } catch (err) {
      handleErrors(err);
    }
  });


});
