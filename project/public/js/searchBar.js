const searchBar = document.getElementById('searchBar');
const list = document.querySelector('.list-group');
let projectNames = [];

searchBar.addEventListener('keyup', (event) => {
  const searchString = event.target.value.toLowerCase();
  const projects = list.getElementsByTagName('li');
  Array.from(projects).forEach((project) => {
    const name = project.projectName;
    if (name.toLowerCase().indexOf(searchString) !== -1) {
      project.style.display = 'block';
    } else {
      book.style.display = 'none'
    }
  })

})

const projectName = async () => {

}
