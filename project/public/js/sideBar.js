let toggleNavStatus = false;
const sideBtn = document.getElementById('sidebar-btn');
const logOut = document.getElementById("logout");
let toggleNav = function() {
  let getSidebar = document.querySelector(".nav-sidebar");
  let getSidebarUl = document.querySelector(".nav-sidebar ul");
  let getSidebarTitle = document.querySelector(".nav-sidebar span");
  let getSidebarLinks = document.querySelectorAll(".nav-sidebar a");

  if (toggleNavStatus === false) {
    getSidebarUl.style.visibility = "visible";
    getSidebar.style.width = "150px";
    getSidebarTitle.style.opacity = "0.5";

    let arrayLength = getSidebarLinks.length;
    for (let i = 0; i < arrayLength; i ++) {
      getSidebarLinks[i].style.opacity = "1";
    }

    toggleNavStatus = true;
  } else if (toggleNavStatus === true) {
    getSidebar.style.width = "0";
    getSidebarTitle.style.opacity = "0";

    let arrayLength = getSidebarLinks.length;
    for (let i = 0; i < arrayLength; i ++) {
      getSidebarLinks[i].style.opacity = "1";
    }

    getSidebarUl.style.visibility = "hidden"
    toggleNavStatus = false;
  }
}

sideBtn.addEventListener('click', (event) => {
  toggleNav();

  logOut.addEventListener("click", () => {
    localStorage.removeItem("SPRINT_TURF_ACCESS_TOKEN");
    localStorage.removeItem("SPRINT_TURF_CURRENT_USER_ID");
    window.location.href = "/users/login";
  });
})
