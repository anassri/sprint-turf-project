window.addEventListener("DOMContentLoaded", event => {
     let list = document.querySelector('.projects');
     const projects = await res.json();

     for (let project in projects) {
          let li = document.createElement('li');
          li.classList.add('project');
          li.innerHTML = project.projectName;

          list.appendChild(li);
     }
});