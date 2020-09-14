
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
    li.innerHTML = `${project.projectName}`;

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

  const compProj = await fetch('/projects-complete');
  const incProj = await fetch('/projects-incomplete');
  const resTeam = await fetch("/projects-team")
  const resetProjects = await reset.json();
  const teams = await resTeam.json();
  const inc = await incProj.json();
  const comp = await compProj.json();

  const taskBtn = document.querySelector('#task-div')
  const teamBtn = document.querySelector('#teamName')
  const completeBox = document.querySelector('#complete-box');
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


  teamBtn.addEventListener('click', (event) => {
    let teamCarat = document.getElementById('team-caret');
    if (!teamBtn.classList.contains('bold')) {
      teamBtn.classList.add('bold')
      teamNameList.classList.remove('hidden')
      teamCarat.classList.add('rotate');
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
      teamCarat.classList.remove('rotate');
    }

    const teamName = document.getElementById('team-name-list');
    teamName.addEventListener('click', (event) => {
      const name = document.querySelectorAll('.filter-items')

      if (!event.target.classList.contains('bold')) {
        let team = event.target.id
        let teamProj = [];
        for (let i = 0; i < resetProjects.length; i++) {
          if (team === `teamNameId-${resetProjects[i].teamId}` && resetProjects[i].status === false && !completeBox.classList.contains('active')) {
            let proj = resetProjects[i]
            teamProj.push(proj)
          }
           if (team === `teamNameId-${resetProjects[i].teamId}` && resetProjects[i].status === true && completeBox.classList.contains('active')) {
            let proj = resetProjects[i];
            teamProj.push(proj)
          }
        }

        event.target.classList.add('bold');
        populateList(teamProj)
        name.forEach(el => {
          if (!el.classList.contains('bold')){
            let arr = [];
            arr.push(el)
            arr.forEach(el => {
              el.classList.add('hidden');
            })
          }
        })
      } else {
        if (!completeBox.classList.contains('active')){populateList(inc)}
        if (completeBox.classList.contains('active')){populateList(comp)}
        event.target.classList.remove('bold')
        name.forEach(el => {
          if (!el.classList.contains('bold')){
            let arr = [];
            arr.push(el)
            arr.forEach(el => {
              el.classList.remove('hidden');
            })
          }
        })
      }

    })

  });

});
