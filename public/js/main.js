console.log("client side js");

const signupForm = document.querySelector("#signupForm");
const signinForm = document.querySelector("#signinForm");
const signinFormAlert = document.querySelector("#signinFormAlert");
const tasksArea = document.querySelector("#tasksArea");
// let user = {};
// const username = document.querySelector("#name");
// const email = document.querySelector("#email");
// const password = document.querySelector("#password");

async function fetchTasks() {
    const url = "/tasks?sortBy=createdAt:desc&limit=3";
    // const params = { sortBy: "createdAt:dec", limit: 3 };
    // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const rawResponse = await fetch(url, {
        method: "GET",
        headers: buildHeaders(localStorage.authorization),
    });
    const tasks = await rawResponse.json();

    
    for (let j = 0; j < tasks.length; j++) {
        document.getElementById("tasksAreaContainer").innerHTML += '<div class="col-lg-3">' +
        '<div class="task-item">' +
            '<a class="task-square" href="#">' +
            '<div>' +
                '<h2><i class="bi ' + (tasks[j].completed ? 'bi-check-square' : 'bi-x-square') + '"></i></h2>' +
                '<p>'+ tasks[j].description +'</p>' +
            '</div>' +
            '</a>' +
        '</div>' +
        '</div>'
    }
}

function buildHeaders(authorization = null) {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": (authorization) ? authorization : "Bearer TOKEN_MISSING"
    };
    return headers;
}

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
        if (content.error) {
            signinFormAlert.classList = "alert alert-danger";       // to make the div hidden
            signinFormAlert.textContent = content.error;
        }
        window.localStorage.setItem("authorization", content.token);
        // user = content.user;    // not working as the script will run again when the redirect happens.
        window.localStorage.setItem("user", JSON.stringify(content.user));
        window.location = "/";      // redirection
    });
}

if (signupForm) {
    signupForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        const formData = new FormData(signupForm);
        const jsonFormData = Object.fromEntries(formData.entries());
        // for (const pair in new FormData(signupForm)){
        //     jsonFormData[pair[0]] = pair[1];
        // }
        // console.log(jsonFormData);
        // console.log(formdata.entries());
        // fetch("/users?name=" + username.value + "&email=" + email.value + 
        // "&password=" + password.value)
        // .then();

        if (!jsonFormData){
            console.log("not JS object!");
        }

        const rawResponse = await fetch("../users", {
            method: "POST",
            headers: buildHeaders(),
            body: JSON.stringify(jsonFormData)
        });
        const content = await rawResponse.json();
        console.log(content);
    });
}

const user = JSON.parse(localStorage.user);     // you must validate that the user is signed in on the server.
if (user) {
    document.getElementById("navbarDropdownUser").innerHTML = user.name;
}

if (tasksArea) {
    fetchTasks();
}