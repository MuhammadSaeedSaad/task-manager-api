console.log("client side js");

const sampleForm = document.querySelector("#sampleForm");
// const username = document.querySelector("#name");
// const email = document.querySelector("#email");
// const password = document.querySelector("#password");

function buildHeaders(authorization = null) {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": (authorization) ? authorization : "Bearer TOKEN_MISSING"
    };
    return headers;
}


if (sampleForm) {
    sampleForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        let formdata = new FormData(sampleForm);
        const jsonFormData = Object.fromEntries(formdata.entries());
        // for (const pair in new FormData(sampleForm)){
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

