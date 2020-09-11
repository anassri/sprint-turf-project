import { populateList } from './projects.js'
window.addEventListener("DOMContentLoaded", async event => {

  const reset = await fetch("/projects-data");
  const res = await fetch("/projects-deadline");
  const resInc = await fetch('/projects-data/false');
  const projects = await res.json();
  const incProjects = await resInc.json();
  const resetProjects = await reset.json();

  const taskBtn = document.querySelector('#tasks')

  taskBtn.addEventListener("click", async (event) => {
    let list = document.querySelector('.tasks-list');

    if (!list.classList.contains('hidden')) {
      list.classList.add('hidden');
    } else {
      list.classList.remove('hidden');
    }
  })

  const deadlineBtn = document.querySelector('#deadline');

  deadlineBtn.addEventListener('click', async (event) => {

    let target = event.target.id;
    populateList(projects);
    let completeBox = document.querySelector('#complete');

    if (!completeBox.classList.contains('hidden')){
      completeBox.classList.add('hidden');
      deadlineBtn.classList.add('bold')
    } else {
      completeBox.classList.remove('hidden');
      deadlineBtn.classList.remove('bold')
      populateList(resetProjects)
    }
  })


});
