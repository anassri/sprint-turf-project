const searchBar = document.getElementById('searchBar');
const list = document.querySelector('.list-group');
let projectNames = [];

searchBar.addEventListener('keyup', (event) => {
  const searchString = event.target.value.toLowerCase();
  const projects = list.getElementsByTagName('li');

  Array.from(projects).forEach((project) => {
    // console.log("project------",project)
    const name = project.innerHTML;
    // console.log("name-----",name)
    if (name.toLowerCase().indexOf(searchString) !== -1) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none'
    }
  })
})
