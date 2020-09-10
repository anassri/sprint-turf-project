const taskBtn = document.querySelector('#tasks')

taskBtn.addEventListener("click", (event) => {
  let list = document.querySelector('.tasks-list');

  if (!list.classList.contains('hidden')){
    list.classList.add('hidden');
  } else {
    list.classList.remove('hidden');
  }
})
