import { fetchNotes } from "./notes.js"

window.addEventListener("DOMContentLoaded", async event => {
     // Sam - Populate the projects list with the data from the database

     const res = await fetch("/projects-data");
     const resInc = await fetch('/projects-data/false');
     const projects = await res.json();
     const incProjects = await resInc.json();
     console.log(projects);
     
     enumerateStats(projects);
     populateList(incProjects);
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
                    enumerateStats(projects);
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
                         populateDetails(project);
                         fetchNotes(project);
                    }
               });
          });
     const incompleteCon = document.getElementById('incomplete-box');
     const completeCon = document.getElementById('complete-box');
     document.getElementById('complete-inc-container')
          .addEventListener('click', async event => {
               let target = event.target.id;
               if (target === 'incomplete' || target === 'incomplete-box') {
                    let res = await fetch(`/projects-data/false`);
                    let incomplete = await res.json();
                    incompleteCon.classList.add('active');
                    completeCon.classList.remove('active');
                    populateList(incomplete);
               } else if (target === 'complete' || target === 'complete-box') {
                    let res = await fetch(`/projects-data/true`);
                    let completed = await res.json();
                    incompleteCon.classList.remove('active');
                    completeCon.classList.add('active');
                    populateList(completed);
               }
          });
          
    
     
});

// Sam- function to remove the time stamp from the databases date entries
export function splitDate(date) {
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
     let details = document.getElementById('details-list');
     let title = document.getElementById('project-title');

     let res = await fetch(`/team-names/${project.teamId}`);
     let teamSelected = await res.json();
     let teamName = teamSelected.name;

     title.innerHTML = project.projectName;
     start.innerHTML = splitDate(project.createdAt);
     due.innerHTML = splitDate(project.deadline);
     list.innerHTML = "Add when lists/tags are a thing"
     if (teamName === undefined) {
          team.innerHTML = 'No team has been assigned yet';
     } else {
          team.innerHTML = teamName;
     }
     let taskList = JSON.parse(project.description);
     if (details.hasChildNodes) {
          details.innerHTML = '';
     }
     taskList.forEach(task => {
          let check = document.createElement('input');
          let checkLabel = document.createElement('label');
          let conDiv = document.createElement('div');
          conDiv.classList.add('details-check-container');
          check.setAttribute('type', 'checkbox');
          check.setAttribute('name', task);
          check.classList.add('check-item');
          check.classList.add('form-check-input');
          checkLabel.classList.add('check-label');
          checkLabel.classList.add('form-check-label');
          checkLabel.setAttribute('for', task);
          checkLabel.innerHTML = task;
          conDiv.appendChild(check);
          conDiv.appendChild(checkLabel);
          details.appendChild(conDiv);
     });
}

// Sam - Function for generating the stats values and enumerating the page with them.
function enumerateStats(projects) {
     let projectsStat = document.getElementById('project-count');
     let overdueStat = document.getElementById('overdue-count');
     let completedStat = document.getElementById('completed-count');

     let totalCount = 0;
     let overdueCount = 0;
     let completedCount = 0;

     projects.forEach(project => {
          let currentDate = Date.parse(new Date());
          let dueDate = Date.parse(project.deadline);
          // console.log(project.status)
          if (currentDate > dueDate && !project.status) {
               // console.log('over')
               overdueCount++;
          }

          if (project.status) {
               // console.log('complete')
               completedCount++;
          }

          if (!project.status) {
               // console.log('incomplete')
               totalCount++;
          }
     });

     projectsStat.innerHTML = `
          <span id="incomplete-count" class="counter">${totalCount}</span>
          <span id="incomplete-count-title" class="counter-text">Projects</span>`;

     overdueStat.innerHTML = `
          <span id="overdue-count" class="counter">${overdueCount}</span>
          <span id="overdue-count-title" class="counter-text">Overdue</span>`;

     completedStat.innerHTML = `
          <span id="complete-count" class="counter">${completedCount}</span>
          <span id="complete-count-text" class="counter-text">Completed</span>`;
}

export function populateList(projects) {
     let list = document.querySelector('.list-group');
     list.innerHTML = '';
     if (projects.length === 0) {
          return '';
     }

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
}
