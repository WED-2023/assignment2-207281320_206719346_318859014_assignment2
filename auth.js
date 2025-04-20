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
  const form = document.getElementById("login-form");
  const error = document.getElementById("error-message");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = form.username.value.trim();
    const password = form.password.value;
    const validUser = validateUser(username, password);

    if (!validUser) {
      alert("No such user.");
      return false;
    }

    alert(`Welcome back, ${username}!`);
    loadPage("welcome.html");
    window.dispatchEvent(new CustomEvent("userLoggedIn", { detail: username }));
  });
}
