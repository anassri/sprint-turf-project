export const handleCreationErrors = async (err) => {
     if (err.status >= 400 && err.status < 600) {
         const errorJSON = await err.json();
         console.log(errorJSON);
         const errorsContainer = document.querySelector(".errors-container");
         const div = document.createElement('div');
         div.classList.add('alert');
         div.classList.add('alert-danger');
         errorsContainer.appendChild(div);

         if (errorJSON.errors && Array.isArray(errorJSON.errors)) {
             errorJSON.errors.forEach(error => {
                  console.log(error);
                  div.innerHTML += error + '<br />'
             });
         }

     } else {
         alert(
             "Something went wrong. Please check your internet connection and try again!"
         );

     }
 };