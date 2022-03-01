const signupForm = document.querySelector("#signupForm");
const signupFormAlert = document.querySelector("#signupFormAlert");
const mainArea = document.querySelector("#mainArea")

async function signup(signupForm) {
    // if (!jsonFormData){
    //     console.log("not JS object!");
    // }

    const rawResponse = await fetch("../users", {
        method: "POST",
        headers: buildHeaders(),
        body: formToJson(signupForm)
    });
    const content = await rawResponse.json();
    console.log(content);
    try {
        if (content.token) {    //success
            window.localStorage.setItem("authorization", content.token);
            window.localStorage.setItem("user", JSON.stringify(content.user));
            window.location = "/";      // redirection
        } else {
            throw new Error(content.message);
        }
    } catch (error) {
        console.log(error);
        signupFormAlert.classList = "alert alert-danger";       // to make the div hidden
        if (error.message === "duplicate-email"){
            signupFormAlert.textContent = "email already taken";
        } else if (error.message === "password-too-shrot") {
            signupFormAlert.textContent = "password is less than 8 digits";
        } else {
            signupFormAlert.textContent = error.message;
        }
    }
    
}

if (signupForm) {
    signupForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        await signup(signupForm);
    });
}

signedin().then((result) => {
    if (result) {   // I suspect that this is not the optimal way to do that and if result is false error should be thrown.
        try {
            navbarDropdownUser.innerHTML = JSON.parse(localStorage.user).name;
        } catch (error) {
            
        }
        if (window.location.pathname === "/views/signup.html") {
            mainArea.innerHTML = '<p>You are already signed in</p>';
            mainArea.classList += "mt-3";
        }
    } else {
        navbarDropdownDiv.innerHTML = "";
    }
}).catch((error) => {
    navbarDropdownDiv.innerHTML = "";
    console.log(error);
});