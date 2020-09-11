import { handleErrors } from "./utils.js";
import { populateList } from "./projects.js";

// const sortingBtn = document.querySelector(".dropdown-btn");
const dropdown = document.querySelector(".sorting-list-dropdown");
const incompleteCon = document.getElementById('incomplete-box');
const completeCon = document.getElementById('complete-box');

document.addEventListener('click', (e) => {
    if (!e.target.classList.contains("dropdown-icon")) {
        dropdown.classList.add('hidden');
    } else if (e.target.classList.contains('dropdown-icon')) {
        dropdown.classList.toggle('hidden');
    }
});

let value = true;
dropdown.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = e.target.id;
    if (incompleteCon.classList.contains('active')) value = false;
    else if (completeCon.classList.contains('active')) value = true;
    
    
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
        const res = await fetch(`/projects/${route}/${value}`);
        const projects = await res.json();
        populateList(projects);
    } catch (e){
        handleErrors(e);        
    }
}