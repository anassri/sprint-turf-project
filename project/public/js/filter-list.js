import { populateList } from './projects.js'
window.addEventListener("DOMContentLoaded", async event => {

  const reset = await fetch("/projects-data");
  const res = await fetch("/projects-deadline");
  const resTeam = await fetch("/projects-team")
  const projects = await res.json();
  const resetProjects = await reset.json();
  const teams = await resTeam.json();

  const taskBtn = document.querySelector('#tasks')
  const deadlineBtn = document.querySelector('.deadline');
  const teamBtn = document.querySelector('#teamName')
  const completeBox = document.querySelector('#complete');
  const teamNameList = document.querySelector('#team-name-list');

  taskBtn.addEventListener("click", async (event) => {
    let list = document.querySelector('.tasks-list');

    if (!list.classList.contains('hidden')) {
      list.classList.add('hidden');
    } else {
      list.classList.remove('hidden');
    }
  })

  deadlineBtn.addEventListener('click', async (event) => {

    populateList(projects);
    if (!completeBox.classList.contains('hidden')) {
      completeBox.classList.add('hidden');
      deadlineBtn.classList.add('bold')
    } else {
      completeBox.classList.remove('hidden');
      deadlineBtn.classList.remove('bold')
      populateList(resetProjects)
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
          li.classList.add('filter-items');
          li.setAttribute('id', `teamNameId-${team.id}`);
          li.innerHTML = `${i}. ${team.name}`;

          list.appendChild(li);
        })
      }

    } else {
      teamBtn.classList.remove('bold')
      teamNameList.classList.add('hidden')
    }

    const teamName = document.getElementById(`${event.target.id}`);
    teamName.addEventListener('click', (event) => {

     if (!event.target.classList.contains('bold')){
      let team = event.target.id
      let teamProj = [];
      for (let i = 0; i < resetProjects.length; i++){
        if (team === `teamNameId-${resetProjects[i].teamId}`) {
          let proj = resetProjects[i]
          teamProj.push(proj)
        }
      }
      populateList(teamProj)

      teamNameList.classList.remove('bold')
      event.target.classList.add('bold')
      teamNameList.classList.remove('hidden')
     } else {
       teamNameList.classList.remove('bold');
       event.target.classList.remove('bold');
       teamNameList.classList.add('hidden')
       populateList(resetProjects);
     }

    })
  });

});
