const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", async(e)=>{
    e.preventDefault();
    
    const formData = new FormData(signUpForm);
    
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    
    const body = { email, password, username };
    
    try{
        
    }catch (e){
        
    }
})