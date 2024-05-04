function handleLoginRegistration() {
    if (typeof(Storage) !== "undefined") {
        // Check if user is already logged in
        if (localStorage.getItem("loggedInUser")) {
            alert("You are already logged in as: " + localStorage.getItem("loggedInUser"));
        } else {
            let username = prompt("Enter your username:");
            
            if (localStorage.getItem(username)) {
                let password = prompt("Enter your password:");
                if (localStorage.getItem(username + "_password") === password) {
                    alert("Login successful! Welcome back, " + username);
                    localStorage.setItem("loggedInUser", username);
                } else {
                    alert("Incorrect password");
                }
            } else {
                let register = confirm("User does not exist. Do you want to register?");
                if (register) {
                    let newPassword;
                    do {
                        newPassword = prompt("Enter your password (must be at least 8 characters):");
                    } while (newPassword.length < 8);
    
                    localStorage.setItem(username, true);
                    localStorage.setItem(username + "_password", newPassword);
                    alert("Registration successful! Please login now.");
                }
            }
        }
    } else {
        alert("Sorry, your browser does not support local storage.");
    }
}