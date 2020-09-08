window.addEventListener("DOMContentLoaded", async event => {
     console.log('test')
     let list = document.querySelector('.list-group');
     const res = await fetch("/projects-data");
     const projects = await res.json();
     projects.forEach((project, i) => {
          i++
          let conDiv = document.createElement('div');
          let li = document.createElement('li');
          li.classList.add('list-group-item');
          li.classList.add('project-items')
          li.setAttribute('id', `Item-${i}`);
          li.innerHTML = `${i}. ${project.projectName}`;
          conDiv.appendChild(li);

          list.appendChild(conDiv);
     });
     document.getElementById('list-area')
          .addEventListener('click', e => {
               let target = e.target.id;
               let element = document.getElementById(target);
               if (element.classList.contains('selected')) {
                    element.classList.remove('selected')
                    return;
               }
               element.classList.add('selected')
          });
});
