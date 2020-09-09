window.addEventListener("DOMContentLoaded", async event => {
     let list = document.querySelector('.list-group');
     const res = await fetch("/projects-data");
     const projects = await res.json();
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

     document.getElementById('list-area')
          .addEventListener('click', e => {
               let target = e.target.id;
               let stats = document.querySelector('.stats-area');
               let details = document.querySelector('.description-area');
               let element = document.getElementById(target);

               if (element.classList.contains('selected')) {
                    element.classList.remove('selected');
                    details.classList.add('hidden');
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
                         let desc = document.getElementById('description');
                         desc.innerHTML = project.description;
                    }
               });
          });
});
