
const createTaskForm = document.querySelector("#createTaskForm");

async function postTask(createTaskForm) {
    const rawResponse = await fetch("/tasks", {
        method: "post",
        headers: buildHeaders(localStorage.authorization),
        body: formToJson(createTaskForm)
    })
    const content = await rawResponse.json();
    console.log(content);
}

if (createTaskForm) {
    createTaskForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        await postTask(createTaskForm);
        window.location = "/views/tasks.html";
    });
}