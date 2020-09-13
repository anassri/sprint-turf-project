const searchBar = document.getElementById('searchBar');
const list = document.querySelector('.list-group');

searchBar.addEventListener('keyup', (event) => {
  // grab the string typed in the search bar
  const searchString = event.target.value.toLowerCase();
  // grab all of the li elements generated in the ul, each the li elements will be every seperate projoect
  const projects = list.getElementsByTagName('div');

  // create an array from these projects to iterate
  Array.from(projects).forEach((project) => {
    // console.log("project------",project)

    // grab project name form li innerHTML
    const name = project.innerHTML;
    // console.log("name-----",name)

    // compare search string to project names to find the one user is looking for
    if (name.toLowerCase().indexOf(searchString) !== -1) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none'
    }
  })
})
