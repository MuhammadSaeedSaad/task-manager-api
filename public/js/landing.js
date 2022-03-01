signedin().then((result) => {
    if (result) {   // I suspect that this is not the optimal way to do that and if result is false error should be thrown.
        try {
            navbarDropdownUser.innerHTML = JSON.parse(localStorage.user).name;
        } catch (error) {
            
        }
        if (window.location.pathname === "/") {
            landingDiv.innerHTML = '<button type="button" class="btn btn-primary">View Tasks</button>' + 
            '<button type="button" class="btn btn-primary">View profile</button>';
            landingDiv.classList += "mt-3";
        }
    } else {
        navbarDropdownDiv.innerHTML = "";
    }
}).catch((error) => {
    navbarDropdownDiv.innerHTML = "";
    console.log(error);
});