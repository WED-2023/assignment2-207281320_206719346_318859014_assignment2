import { USERS, YEARS, MONTHS, getDaysInMonth } from "./constants.js";
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

export function populateDateSelectors() {
  const yearSelect = document.getElementById("year");
  const monthSelect = document.getElementById("month");
  const daySelect = document.getElementById("day");

  if (!yearSelect || !monthSelect || !daySelect) return;

  // Fill year
  YEARS.forEach((y) => yearSelect.append(new Option(y, y)));

  // Fill month
  MONTHS.forEach((m) => monthSelect.append(new Option(m, m)));

  // Fill days based on year & month
  const updateDays = () => {
    const y = parseInt(yearSelect.value);
    const m = parseInt(monthSelect.value);
    if (!y || !m) return;

    const days = getDaysInMonth(y, m);
    daySelect.innerHTML = `<option disabled selected>Day</option>`;
    for (let i = 1; i <= days; i++) {
      daySelect.append(new Option(i, i));
    }
  };

  yearSelect.addEventListener("change", updateDays);
  monthSelect.addEventListener("change", updateDays);
}

/* Login & registration form event listener (setup) */
export function setup() {
  // get forms
  const loginForm = document.getElementById("login-form");
  const registerationForm = document.getElementById("registration-form");

  // Return none if no forms currently
  if (!loginForm && !registerationForm) return;

  populateDateSelectors();

  // Login form
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Get the values from the form and validate them
      const username = loginForm.username.value.trim();
      const password = loginForm.password.value;
      const validUser = validateUser(username, password);

      // No user
      if (!validUser) {
        alert("No such user.");
        return false;
      }

      // Succesfull login
      alert(`Welcome back, ${username}!`);
      localStorage.setItem("loggedUser", username);
      //location.reload(); // Reload to load the script again, allows for the index.html's logout button to appear
      loadPage("game.html"); // Than load main's div with config
    });
  }

  // Registration form
  if (registerationForm) {
    registerationForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Get values from the form
      const username = registerationForm.username.value.trim();
      const password = registerationForm.password.value;
      const confirmPassword = registerationForm["confirm-password"].value;
      const firstName = registerationForm["first-name"].value.trim();
      const lastName = registerationForm["last-name"].value.trim();
      const email = registerationForm.email.value.trim();
      // Get current users in local storage + mock users
      const users = getUsers();

      // Validate password
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(password)) {
        alert(
          "Password must be at least 8 characters long and contain both letters and numbers only."
        );
        return false;
      }

      // Validate matching passwords
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
      }

      // Validate user
      if (users.find((u) => u.username === username)) {
        alert("Username already exists.");
        return false;
      }

      // Validate username
      const nameRegex = /^[A-Za-z]+$/;
      if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        alert("Name must only contain letters.");
        return false;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
      }

      // Succesfull registration
      const newUser = { username, password }; // new created user
      users.push(newUser); // add to current users
      saveUsers(users); // update all current users
      alert("Registration successful!");
      //location.reload(); // Reload to load the script again, allows for the index.html's logout button to appear
      loadPage("login.html"); // load login page
    });
  }
}
