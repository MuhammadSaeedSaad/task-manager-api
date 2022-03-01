const tasksArea = document.querySelector("#tasksArea");

async function fetchTasks() {
    const url = "/tasks?sortBy=createdAt:desc&limit=8";
    const rawResponse = await fetch(url, {
        method: "GET",
        headers: buildHeaders(localStorage.authorization),
    });
    console.log(rawResponse);
    const tasks = await rawResponse.json();
    console.log(tasks);

    
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

signedin().then((result) => {
    if (result) {   // I suspect that this is not the optimal way to do that and if result is false error should be thrown.
        try {
            navbarDropdownUser.innerHTML = JSON.parse(localStorage.user).name;
        } catch (error) {
            
        }
        if (window.location.pathname === "/views/tasks.html") {
            fetchTasks();
        }
    } else {
        navbarDropdownDiv.innerHTML = "";
    }
}).catch((error) => {
    navbarDropdownDiv.innerHTML = "";
    console.log(error);
});

// if (tasksArea) {
//     fetchTasks();
// }