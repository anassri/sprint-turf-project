import { handleErrors } from "./utils.js"

const logIn = document.querySelector(".log-in-form");
const logOut = document.getElementById("logout")
const logInButton = document.querySelector(".btn-primary")

// console.log("logIN::::::::", logIn)
logIn.addEventListener("submit", async (e) => {

  console.log("INSIDE LOGIN")
  e.preventDefault();
  const formData = new FormData(logIn);
  const email = formData.get("email");
  console.log("email::::", email)
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
    const { token, user: { id },} = await res.json();

    localStorage.setItem("TURF_ACCESS_TOKEN", token);
    localStorage.setItem("TURF_CURRENT_USER_ID", id);

    window.location.href = "/";
    
  } catch (err) {
    handleErrors(err);
  }
});


logOut.addEventListener("click", () => {

  console.log("Inside Click");
  localStorage.removeItem("TURF_ACCESS_TOKEN");
  localStorage.removeItem("TURF_CURRENT_USER_ID");


  window.location.href = "/users/login'";

  // (href = '/users/login') 
  
})

// logOut.addEventListener("click", async (e) => {

//   localStorage.removeItem("TURF_ACCESS_TOKEN");
//   localStorage.removeItem("TURF_CURRENT_USER_ID");
//   console.log("AAAAAA");
//   const res = await fetch("/users/sessions", {
//     method: "DELETE",
//   })

//   if (res.ok) {
//     window.location.href = "/";
//   }
// })
