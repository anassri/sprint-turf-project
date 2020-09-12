import { handleErrors } from "./utils.js"
import { splitDate } from "./projects.js";

// Ammar - add a note to a specific project
async function addNote(project) {
    document
        .getElementById("add-a-note")
        .addEventListener('focus', (e) => {
            console.log('focused');
            document
                .querySelector('.note-buttons')
                .classList
                .remove('hidden');
        });
    document
        .querySelector('.note-cancel-button')
        .addEventListener('click', (e) => {
            e.preventDefault();
            document
                .querySelector('.note-buttons')
                .classList
                .add('hidden');
        });

    const addNoteForm = document.querySelector(".note-form");

    addNoteForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        console.log("I'm activated");

        const formData = new FormData(addNoteForm);
        const note = formData.get("note");
        const userId = localStorage.getItem("SPRINT_TURF_CURRENT_USER_ID");
        const projectId = project.id;
        const body = { note, projectId, userId };
        try {
            const res = await fetch(`/projects/${projectId}/notes`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("SPRINT_TURF_ACCESS_TOKEN")}`
                },
            });
            if (res.status === 401) {
                window.location.href = "/users/login";
                return;
            }
            if (!res.ok) throw res;
            console.log("Added");
            fetchNotes(project);

        } catch (e) {
            handleErrors(e);
        }


    });
}

// Ammar - display project notes
export async function fetchNotes(project) {
    try {
        const res = await fetch(`/projects/${project.id}/notes`);
        if (res.status === 401) {
            window.location.href = "/users/login";
            return;
        }
        const notes = await res.json();
        const errorsContainer = document.querySelector(".errors-container");
        errorsContainer.innerHTML = "";
        const addNoteContainer = document.querySelector('.add-note');
        addNoteContainer.innerHTML = "";
        addNoteContainer.innerHTML =
            `<form class="note-form">
                    <div class="add-note">
                         <textarea id="add-a-note" name="note" class="form-control" rows="1" placeholder="Add a Note"></textarea>
                    </div>
                    <div class="py-4 note-buttons hidden">
                         <button type='submit' class='btn btn-primary'>Save</button>
                         <a href="" class='btn btn-warning ml-2 note-cancel-button'>cancel</a>
                    </div>
               </form>`;
        const notesContainer = document.querySelector('.notes-container');

        const notesHtml = notes.map((note, id) => `
               <div class="card note-card" id="note-${id}">
                    <div class="card-body">
                    <p class="card-text">${note.note}</p>
                    <p class="card-text" style="font-size:10px">${note.User.firstName} ${note.User.lastName}, ${splitDate(note.createdAt)}</p>
                    </div>
               </div>
               `
        );

        notesContainer.innerHTML = "";
        notesContainer.innerHTML = notesHtml.join("");
        addNote(project);
    } catch (e) {
        handleErrors(e);
    }
}