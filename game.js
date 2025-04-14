document.addEventListener('keydown', function(event) {
    if(event.key === 'ArrowLeft') {
        // Move player spaceship left
    }
    if(event.key === 'ArrowRight') {
        // Move player spaceship right
    }
});

function shoot() {
    // Implement shooting function for the player
}

function validateForm() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let email = document.getElementById("email").value;

    // Validate password (at least 8 characters with letters and numbers)
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters long and contain both letters and numbers.");
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

    // Validate email
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // All checks passed, form can be submitted
    alert("Registration successful!");
    return true; // Submit the form
}

// Populate Year Options (from 1900 to the current year)
const yearSelect = document.getElementById("year");
const currentYear = new Date().getFullYear();
for (let year = 1900; year <= currentYear; year++) {
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

