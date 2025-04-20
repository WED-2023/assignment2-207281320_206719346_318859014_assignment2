/* GLOBAL */
function loadPage(url) {
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      document.querySelector("main").innerHTML = html;
      attachPageEvents();
    })
    .catch((err) => {
      document.querySelector("main").innerHTML = "<p>WHOOPS!</p>";
    });
}

document
  .getElementById("nav-home")
  .addEventListener("click", () => loadPage("welcome.html"));
document
  .getElementById("nav-about")
  .addEventListener("click", () => loadPage("about.html"));
document
  .getElementById("nav-how")
  .addEventListener("click", () => loadPage("howtoplay.html"));

window.addEventListener("DOMContentLoaded", () => {
  loadPage("welcome.html");
});

function attachPageEvents() {
  const regBtn = document.getElementById("register-btn");
  if (regBtn) {
    regBtn.addEventListener("click", () => loadPage("register.html"));
  }
  const loginBtn = document.getElementById("login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => loadPage("login.html"));
  }
}

/* LOGIN */

function validateLogin() {
  event.preventDefault();

  let username = document.getElementById("login-username").value;
  let password = document.getElementById("login-password").value;

  // Retrieve users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [
    { username: "p", password: "testuser" },
  ];

  // Check if the entered username and password match any user in the users list
  let userExists = users.find(
    (user) => user.username === username && user.password === password
  );

  if (userExists) {
    // Successful login
    alert("Login successful!");
    window.location.href = "config.html";
    return true;
  } else {
    // Invalid credentials
    document.getElementById("error-message").style.display = "block";
    return false; // Prevent form submission
  }
}

/* REGISTER */

const predefinedUsers = [{ username: "p", password: "testuser" }];
// Retrieve users from localStorage or use predefined users if not found
let users = JSON.parse(localStorage.getItem("users")) || predefinedUsers;

function validateForm() {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm-password").value;
  let firstName = document.getElementById("first-name").value;
  let lastName = document.getElementById("last-name").value;
  let email = document.getElementById("email").value;

  // Validate password (at least 8 characters with letters and numbers)
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert(
      "Password must be at least 8 characters long and contain both letters and numbers only."
    );
    return false;
  }

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  // Check if first name and last name contain only letters (no numbers)
  let nameRegex = /^[A-Za-z]+$/;
  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    alert("First name and last name must not contain numbers.");
    return false;
  }
  // Check if the username already exists
  let existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    alert("Username already exists. Please choose another username.");
    return false;
  }

  // Validate email
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }
  // If everything is valid, add the user to the list
  users.push({ username, password });

  // Save the updated users array to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful!");

  // Redirect to login page
  // setTimeout(function() {
  //     console.log("Redirecting to login.html...");
  //     window.location.href = "login.html";  // Redirect to login page
  // }, 500);
  window.location.href = "login.html";
  return true; // Submit the form
}

// Populate Year Options (from 1940 to the current year)
const yearSelect = document.getElementById("year");
const currentYear = new Date().getFullYear();
for (let year = 1940; year <= currentYear; year++) {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
}

// Populate Month Options
const monthSelect = document.getElementById("month");
for (let month = 1; month <= 12; month++) {
  const option = document.createElement("option");
  option.value = month;
  option.textContent = month;
  monthSelect.appendChild(option);
}

// Populate Day Options (based on the selected month and year)
const daySelect = document.getElementById("day");

function updateDays() {
  // Get selected year and month
  const selectedYear = parseInt(yearSelect.value);
  const selectedMonth = parseInt(monthSelect.value);

  // If year and month are selected, update the days
  if (!isNaN(selectedYear) && !isNaN(selectedMonth)) {
    // Get the number of days in the selected month and year
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    daySelect.innerHTML = '<option value="" disabled selected>Day</option>'; // Reset day options

    // Add day options based on the number of days in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const option = document.createElement("option");
      option.value = day;
      option.textContent = day;
      daySelect.appendChild(option);
    }
  }
}

// Event listeners to update day options when year or month changes
yearSelect.addEventListener("change", updateDays);
monthSelect.addEventListener("change", updateDays);

// Initially populate the days based on the default selections
updateDays();
