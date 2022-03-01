// import { buildHeaders } from './main.js';
// const buildHeaders = require("./main")

const signinForm = document.querySelector("#signinForm");
const signinFormAlert = document.querySelector("#signinFormAlert");

if (signinForm) {
    signinForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        const formData = new FormData(signinForm);
        const jsonFormData = Object.fromEntries(formData.entries());
        if(!jsonFormData) { console.log("not JS object"); }
        const rawResponse = await fetch("../users/login", {
            method: "post",
            headers: buildHeaders(),
            body: JSON.stringify(jsonFormData)
        });
        const content = await rawResponse.json();
        try {
            if (content.token) {    //success
                window.localStorage.setItem("authorization", content.token);
                window.localStorage.setItem("user", JSON.stringify(content.user));
                window.location = "/";      // redirection
            } else {
                throw new Error(content.message);
            }
        } catch (error) {
            signinFormAlert.classList = "alert alert-danger";       // to make the div hidden
            if (error.message === "incorrect-email-or-password"){
                signinFormAlert.textContent = "incorrect email or password";
            }
        }
    });
}

signedin().then((result) => {
    if (result) {   // I suspect that this is not the optimal way to do that and if result is false error should be thrown.
        try {
            navbarDropdownUser.innerHTML = JSON.parse(localStorage.user).name;
        } catch (error) {
            
        }
        if (window.location.pathname === "/views/signin.html") {
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