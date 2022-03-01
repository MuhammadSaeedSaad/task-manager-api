console.log("client side js");

const signOutButton = document.querySelector("#signOutButton");
const navbarDropdownUser = document.querySelector("#navbarDropdownUser");
const navbarDropdownDiv = document.querySelector("#navbarDropdownDiv");
const landingDiv = document.querySelector("#landingDiv");

function buildHeaders(authorization = null) {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": (authorization) ? authorization : "Bearer TOKEN_MISSING"
    };
    return headers;
}

function formToJson(form) {
    const formData = new FormData(form);
    const jsonFormData = Object.fromEntries(formData.entries());
    console.log(jsonFormData);
    return JSON.stringify(jsonFormData);
}

async function isValidToken() {
    const rawResponse = await fetch("/users/me", {
        method: "get",
        headers: buildHeaders(localStorage.authorization)
        // ,
        // body: body ? JSON.stringify(body) : null     // no body needed
    });
    const response = await rawResponse.json();
    return ((response.name) ? true : false);
}

async function sendSignOut() {
    console.log("inside sendSignOut")
    const rawResponse = await fetch("/users/logout", {
        method: "post",
        headers: buildHeaders(localStorage.authorization),
    });
    console.log(rawResponse);
    // const response = await rawResponse.json();
    // console.log(response)
    // return ((response.name) ? true : false);        // response.name && true
}

async function signedin() {
    if (!localStorage.authorization) {
        return false;
    }
    const isvalidtoken = await isValidToken();
    return isvalidtoken;
}

async function signOut() {
    if (localStorage.authorization) {
        console.log("inside signOut")
        if (await isValidToken()) {
            sendSignOut();
        }
        delete localStorage.authorization;
        delete localStorage.user;
    }
}

if (signOutButton) {
    signOutButton.addEventListener("click", async function (e) {
        e.preventDefault();
        await signOut();
        window.location = "/";
    })
}
// module.exports = buildHeaders;
