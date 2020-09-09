const searchBar = document.getElementById('searchBar');
const list = document.getElementById('searchList');
let projectNames = [];

searchBar.addEventListener('keyup', (event) => {
  const searchString = event.target.value
  const filteredProjects = projectNames.filter( project => {
    return project.name.includes(searchString)
  })

})


// const loadData = async () => {
//   try {
//     const res = await fetch('/db/')
//     let projectNames = await res.json();
//     displayProjects(projectNames);
//   }
// }


// const projectNames = (projects) => {
//   const pugString = projects
//   .map((project) => {
//     return
//     li(class="projects")

//   })
// }
