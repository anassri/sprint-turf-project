const db = require('project/db/models');
const { Project, User, Team, Note, Tag } = db;


const taskBtn = document.querySelector('#tasks')

taskBtn.addEventListener("click", (event) => {
  let list = document.querySelector('.tasks-list');

  if (!list.classList.contains('hidden')){
    list.classList.add('hidden');
  } else {
    list.classList.remove('hidden');
  }
})

const deadlineBtn = document.querySelector('#deadline');

todayBtn.addEventListener("click", (event) => {

})
