import { YEARS, MONTHS, getDaysInMonth } from "./constants.js";

/* GLOBAL */
function loadPage(url) {
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      document.querySelector("main").innerHTML = html;
      attachPageEvents();

      if (url === "register.html") {
        const form = document.getElementById("registration-form");
        if (form) {
          form.addEventListener("submit", validateForm);
        }

        const yearSelect = document.getElementById("year");
        const monthSelect = document.getElementById("month");
        const daySelect = document.getElementById("day");

        if (yearSelect && monthSelect && daySelect) {
          YEARS.forEach((year) => {
            const option = document.createElement("option");
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
          });

          MONTHS.forEach((month) => {
            const option = document.createElement("option");
            option.value = month;
            option.textContent = month;
            monthSelect.appendChild(option);
          });

          function updateDays() {
            const selectedYear = parseInt(yearSelect.value);
            const selectedMonth = parseInt(monthSelect.value);

            if (!isNaN(selectedYear) && !isNaN(selectedMonth)) {
              const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
              daySelect.innerHTML =
                '<option value="" disabled selected>Day</option>';
              for (let day = 1; day <= daysInMonth; day++) {
                const option = document.createElement("option");
                option.value = day;
                option.textContent = day;
                daySelect.appendChild(option);
              }
            }
          }

          yearSelect.addEventListener("change", updateDays);
          monthSelect.addEventListener("change", updateDays);
          updateDays();
        }
      }

      if (url === "login.html") {
        const loginForm = document.getElementById("login-form");
        if (loginForm) {
          loginForm.addEventListener("submit", validateLogin);
        }
      }
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
function validateLogin(event) {
  event.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [
    { username: "p", password: "testuser" },
  ];

  const userExists = users.find(
    (user) => user.username === username && user.password === password
  );

  if (userExists) {
    alert("Login successful!");
    loadPage("config.html");
    return true;
  } else {
    document.getElementById("error-message").style.display = "block";
    return false;
  }
}

/* REGISTER */
const predefinedUsers = [{ username: "p", password: "testuser" }];
let users = JSON.parse(localStorage.getItem("users")) || predefinedUsers;

function validateForm(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert(
      "Password must be at least 8 characters long and contain both letters and numbers only."
    );
    return false;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  const nameRegex = /^[A-Za-z]+$/;
  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    alert("First name and last name must not contain numbers.");
    return false;
  }

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    alert("Username already exists. Please choose another username.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful!");
  loadPage("login.html");
  return true;
}

/* CONFIG */

// Set up a flag to track when the user is selecting the shoot key
let isSelectingShootKey = false;

// When the "Select key to shoot" input is clicked, allow key selection
document.getElementById("shoot-key").addEventListener("click", function () {
  // Focus the input field to capture the key press
  this.focus();
  isSelectingShootKey = true; // Allow key selection
});

// Prevent key selection when the user is typing the game time
document.getElementById("game-time").addEventListener("click", function () {
  isSelectingShootKey = false; // Disable key selection when editing game time
});

// Listen for keydown events to set the shoot key
document.addEventListener("keydown", function (event) {
  // Only allow key selection if the user is focused on the "Select key to shoot" input
  if (isSelectingShootKey) {
    let keyPressed = event.key;

    // If the key is space, show "space" in the input field
    if (keyPressed === " ") {
      document.getElementById("shoot-key").value = "space";
    } else {
      // For any other key, display the actual key pressed
      document.getElementById("shoot-key").value = keyPressed;
    }

    // After a key is selected, disable further key selection (optional)
    isSelectingShootKey = false;
  }
});
// Function to update the UFO image when the color is changed
document
  .getElementById("spaceship-color")
  .addEventListener("change", function () {
    const selectedColor = this.value;
    const ufoImg = document.getElementById("ufo-img");

    // Change the image based on selected color
    if (selectedColor === "green") {
      ufoImg.src = "images/green_ufo.png";
    } else if (selectedColor === "black") {
      ufoImg.src = "images/black_ufo.png";
    } else if (selectedColor === "grey") {
      ufoImg.src = "images/grey_ufo.png";
    } else if (selectedColor === "purple") {
      ufoImg.src = "images/purple_ufo.png";
    }
  });

// When the "Start Game" button is clicked, validate all options
document
  .getElementById("start-game-btn")
  .addEventListener("click", function () {
    let shootKey = document.getElementById("shoot-key").value;
    let gameTime = document.getElementById("game-time").value;
    let spaceshipColor = document.getElementById("spaceship-color").value;

    // Validate that all options are selected
    if (!shootKey || !gameTime || !spaceshipColor) {
      document.getElementById("error-message").style.display = "block";
      return;
    }

    // Validate the game time in MM:SS format
    const timeRegex = /^([0-9]{2}):([0-9]{2})$/; // MM:SS format
    let match = gameTime.match(timeRegex);

    if (!match) {
      alert("Please enter the time in MM:SS format.");
      return;
    }

    let minutes = parseInt(match[1]);
    // let seconds = parseInt(match[2]);

    // Check if the time is at least 02:00 (2 minutes)
    if (minutes < 2) {
      alert("Game time must be at least 02:00.");
      return;
    }

    // Save the configuration to localStorage
    localStorage.setItem("shootKey", shootKey);
    localStorage.setItem("gameTime", gameTime);
    localStorage.setItem("spaceshipColor", spaceshipColor);

    // Redirect to the game page
    loadPage("game.html");
  });
