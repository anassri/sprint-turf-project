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
        if (errorJSON.errors && Array.isArray(errorJSON.errors)) {
            errorsHtml = errorJSON.errors.map(
                (error) => `
                    <div class="alert alert-danger">
                        ${error.message}
                    </div>
                `
            );
        }
        errorsContainer.innerHTML = errorsHtml.join("");

    } else {
        alert(
            "Something went wrong. Please check your internet connection and try again!"
        );

    }
};
