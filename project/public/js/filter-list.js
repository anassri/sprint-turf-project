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

const todayBtn = document.querySelector('#today');

todayBtn.addEventListener("click", (event) => {

})
