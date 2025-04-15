function validateLogin() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [{ username: "p", password: "testuser" }];

    // Check if the entered username and password match any user in the users list
    let userExists = users.find(user => user.username === username && user.password === password);

    if (userExists) {
        // Successful login
        alert("Login successful!");
        // You can redirect the user to another page, like the main game page
        window.location.href = "game.html"; // Or any other page
        return true;
    } else {
        // Invalid credentials
        document.getElementById("error-message").style.display = "block";
        return false; // Prevent form submission
    }
}
