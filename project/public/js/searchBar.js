const searchBar = document.getElementById('searchBar');
const list = document.getElementById('searchList');
let projectNames = [];

searchBar.addEventListener('keyup', (event) => {
  const searchString = event.target.value
  const filteredProjects = projectNames.filter( project => {
    return project.name.includes(searchString)
  })

})
