
async function populateList(projects) {
  let list = document.querySelector('.list-group');
  list.innerHTML = '';
  if (projects.length === 0) {
    return '';
  }

  projects.forEach((project, i) => {
    i++
    let conDiv = document.createElement('div');
    conDiv.classList.add('con-div-projs')
    let li = document.createElement('li');
    li.classList.add('list-group-item');
    li.classList.add('project-items')
    li.setAttribute('id', `${project.id}`);
    li.innerHTML = `${i}. ${project.projectName} `;

    conDiv.appendChild(li);
    list.appendChild(conDiv);
  })

}



window.addEventListener("DOMContentLoaded", async event => {

  const reset = await fetch("/projects-data", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "SPRINT_TURF_ACCESS_TOKEN"
      )}`,
    }
  });
  const res = await fetch("/projects-deadline");
  const resTeam = await fetch("/projects-team")
  const projects = await res.json();
  const resetProjects = await reset.json();
  const teams = await resTeam.json();

  const taskBtn = document.querySelector('#task-div')
  const deadlineBtn = document.querySelector('.deadline-filter');
  const teamBtn = document.querySelector('#teamName')
  const completeBox = document.querySelector('#complete');
  const teamNameList = document.querySelector('#team-name-list');

  taskBtn.addEventListener("click", async (event) => {
    let list = document.querySelector('.tasks-list');
    let mainCarat = document.getElementById('main-caret');
    if (event.target.id === 'task-div' || event.target.id === 'main-caret' || event.target.id === 'tasks') {
      if (!list.classList.contains('hidden')) {
        mainCarat.classList.remove('rotate');
        list.classList.add('hidden');
      } else {
        mainCarat.classList.add('rotate');
        list.classList.remove('hidden');
      }
    }
  })

  deadlineBtn.addEventListener('click', async (event) => {
    let deadlineCarat = document.getElementById('deadline-carat');
    if (event.target.classList.contains('deadline-filter') || event.target.classList.contains('deadline')) {
      populateList(projects);
      if (!deadlineBtn.classList.contains('bold')) {
        deadlineCarat.classList.add('rotate');
        deadlineBtn.classList.add('bold')
      } else {
        deadlineCarat.classList.remove('rotate');
        deadlineBtn.classList.remove('bold')
        populateList(resetProjects)
      }
    }
  })

  teamBtn.addEventListener('click', (event) => {

    if (!teamBtn.classList.contains('bold')) {
      teamBtn.classList.add('bold')
      teamNameList.classList.remove('hidden')
      if (!teamNameList.firstChild) {
        const list = document.querySelector('#team-name-list')
        teams.forEach((team, i) => {
          i++
          let li = document.createElement('li');
          let div = document.createElement('div')
          li.classList.add('filter-items');
          li.setAttribute('id', `teamNameId-${team.id}`);
          li.innerHTML = `${team.name}`;
          list.appendChild(div)
          div.appendChild(li);
        })
      }

    } else {
      teamBtn.classList.remove('bold')
      teamNameList.classList.add('hidden')
    }

    const teamName = document.getElementById(`${event.target.id}`);
    teamName.addEventListener('click', (event) => {

      if (!event.target.classList.contains('bold')) {
        let team = event.target.id
        let teamProj = [];
        for (let i = 0; i < resetProjects.length; i++) {
          if (team === `teamNameId-${resetProjects[i].teamId}`) {
            let proj = resetProjects[i]
            teamProj.push(proj)
          }
        }
        populateList(teamProj)
      } else {
        populateList(resetProjects);
      }
    })

  });

});
