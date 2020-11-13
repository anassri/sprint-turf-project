export const handleErrors = async (err) => {
    if (err.status >= 400 && err.status < 600) {
        const errorJSON = await err.json();
        const errorsContainer = document.querySelector(".errors-container");
        let errorsHtml = [
            `
                    <div class="alert alert-danger">
                        Something went wrong. Please try again.
                    </div>
                `,
        ];
        errorsContainer.innerHTML = errorsHtml.join("");

        if (errorJSON.errors && Array.isArray(errorJSON.errors)) {

            errorsContainer.innerHTML = `
                    <div class="alert alert-danger error-div">
                    </div>
                `;
            errorsHtml = errorJSON.errors.map(
                (error) => {
                  return  `
                        <p class="error"> •  ${error}</p>
                    `}
            );
            document.querySelector(".error-div").innerHTML = errorsHtml.join("");
        }

    } else {
        alert(
            "Something went wrong. Please check your internet connection and try again!"
        );

    }
};
