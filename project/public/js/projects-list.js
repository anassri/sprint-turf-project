window.addEventListener("DOMContentLoaded", async event => {
     let list = document.querySelector('.projects');
     const res = await fetch("/projects-data");
     console.log(res);
     const projects = await res.json();
     projects.forEach(project => {
          console.log(project)
          let li = document.createElement('li');
          li.classList.add('project');
          li.innerHTML = project.projectName;

          list.appendChild(li);
     });
});
