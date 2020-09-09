window.addEventListener("DOMContentLoaded", async event => {
     // Sam - Populate the projects list with the data from the database
     let list = document.querySelector('.list-group');
     const res = await fetch("/projects-data");
     const projects = await res.json();
     projects.forEach((project, i) => {
          i++
          let conDiv = document.createElement('div');
          let li = document.createElement('li');
          li.classList.add('list-group-item');
          li.classList.add('project-items')
          li.setAttribute('id', `${project.id}`);
          li.innerHTML = `${i}. ${project.projectName}`;
          conDiv.appendChild(li);

          list.appendChild(conDiv);
     });
     // Sam - Event handler to open up stats/details on click of a list element and populate details data
     document.getElementById('list-area')
          .addEventListener('click', e => {
               let target = e.target.id;
               let stats = document.querySelector('.stats-area');
               let details = document.querySelector('.description-area');
               let element = document.getElementById(target);

               if (element.classList.contains('selected')) {
                    element.classList.remove('selected');
                    details.classList.add('hidden');
                    stats.classList.remove('hidden');
                    return;
               }

               let projectItems = document.querySelectorAll('.project-items');
               projectItems.forEach(project => {
                    project.classList.remove('selected');
               });

               element.classList.add('selected');
               stats.classList.add('hidden');
               details.classList.remove('hidden');
               let projId = Number(target);
               projects.forEach(project => {
                    if (projId === project.id) {
                         populateDetails(project)
                    }
               });
          });
});

// Sam- function to remove the time stamp from the databases date entries
function splitDate(date) {
     let arr = date.split('T');
     let newDate = arr[0];
     return newDate;
}

// Sam - function to set data in the details section and fetch team names based on team id
async function populateDetails(project) {
     let start = document.getElementById('start-date');
     let due = document.getElementById('due-date');
     let list = document.getElementById('list-entry');
     let team = document.getElementById('team-name');
     let details = document.getElementById('details-area');
     let title = document.getElementById('project-title');

     let res = await fetch('/team-names');
     let teamNames = await res.json();
     let teamName;
     if (project.teamId === undefined) {
          teamName === 'Project not assigned'
     } else {
          teamNames.forEach(team => {
               if (team.id === project.teamId) {
                    teamName = team.name;
               }
          });
     }

     title.innerHTML = project.projectName;
     start.innerHTML = splitDate(project.createdAt);
     due.innerHTML = splitDate(project.deadline);
     list.innerHTML = "Add when lists/tags are a thing"
     team.innerHTML = teamName;
     details.innerHTML = project.description;
}
