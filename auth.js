import { USERS } from "./constants.js";
import { loadPage } from "./script.js";

/* getters & setters */
export function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [...USERS];
}

export function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

/* Validate user function */
export function validateUser(username, password) {
  // Find the specific user
  const users = getUsers();
  const user = users.find((user) => user.username === username);
  // User does not exist or incorrect creds
  if (!user || user.password !== password) {
    return false;
  }
  // Succesfull login
  else {
    return true;
  }
}

/* Login form event listener */
export function setup() {
  const loginForm = document.getElementById("login-form");
  const registerationForm = document.getElementById("registration-form");

  if (!loginForm && !registerationForm) return;

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const username = loginForm.username.value.trim();
      const password = loginForm.password.value;
      const validUser = validateUser(username, password);

      if (!validUser) {
        alert("No such user.");
        return false;
      }

      alert(`Welcome back, ${username}!`);
      localStorage.setItem("loggedUser", username);
      location.reload(); // Reload to load the script again, allows for the index.html's logout button to appear
      loadPage("config.html"); // Than load main's div with config
      window.dispatchEvent(
        new CustomEvent("userLoggedIn", { detail: username })
      );
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const username = registerForm.username.value.trim();
      const password = registerForm.password.value;
      const confirmPassword = registerForm["confirm-password"].value;
      const firstName = registerForm["first-name"].value.trim();
      const lastName = registerForm["last-name"].value.trim();
      const email = registerForm.email.value.trim();

      const users = getUsers();

      // Validations
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      if (users.find((u) => u.username === username)) {
        alert("Username already exists.");
        return;
      }

      const nameRegex = /^[A-Za-z]+$/;
      if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        alert("Name must only contain letters.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      const newUser = { username, password };
      users.push(newUser);
      saveUsers(users);
      localStorage.setItem("loggedUser", username);
      alert("Registration successful!");
      loadPage("login.html");
      window.dispatchEvent(
        new CustomEvent("userLoggedIn", { detail: username })
      );
    });
  }
}
