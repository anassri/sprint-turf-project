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
 
    // We have to redirect after Login
    window.location.href = "/";
    
  } catch (err) {
    if (err.status >= 400 && err.status < 600) {
      const errorJSON = await err.json();
      const errorsContainer = document.querySelector(".errors-container");
      let errorsHtml = [
        `
        <div class="alert alert-danger">
            Something went wrong. Please try again.
        </div>
      `,
      ];
      const { errors } = errorJSON;
      if (errors && Array.isArray(errors)) {
        errorsHtml = errors.map(
          (message) => `
          <div class="alert alert-danger">
              ${message}
          </div>
        `
        );
      }
      errorsContainer.innerHTML = errorsHtml.join("");
    } else {
      alert(
        "Something went wrong. Please check your internet connection and try again!"
      );
    }
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
