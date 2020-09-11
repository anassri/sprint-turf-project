import { handleErrors } from "./utils.js";
import { populateList } from "./projects.js";

const sortingBtn = document.querySelector(".dropdown-btn");
const dropdown = document.querySelector(".sorting-list-dropdown");
  
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains("dropdown-icon")) {
        dropdown.classList.add('hidden');
    } else if (e.target.classList.contains('dropdown-icon')) {
        dropdown.classList.toggle('hidden');
    }
});

dropdown.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = e.target.id;
    
    if (targetId === "sorting-name") {
        fetchSorted("name");
    }
    if (targetId === "sorting-priority") {
        fetchSorted("priority");
        
    }
    if (targetId === "sorting-deadline") {
        fetchSorted("deadline");
        
    }
    if (targetId === "sorting-team") {
        fetchSorted("team");
        
    }
});

async function fetchSorted(route){
    try{
        const res = await fetch(`/projects/${route}`);
        const projects = await res.json();
        populateList(projects);
    } catch (e){
        handleErrors(e);        
    }
}