
// Set up a flag to track when the user is selecting the shoot key
let isSelectingShootKey = false;

// When the "Select key to shoot" input is clicked, allow key selection
document.getElementById("shoot-key").addEventListener("click", function() {
    // Focus the input field to capture the key press
    this.focus();
    isSelectingShootKey = true; // Allow key selection
});

// Prevent key selection when the user is typing the game time
document.getElementById("game-time").addEventListener("click", function() {
    isSelectingShootKey = false; // Disable key selection when editing game time
});

// Listen for keydown events to set the shoot key
document.addEventListener("keydown", function(event) {
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
document.getElementById("spaceship-color").addEventListener("change", function() {
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
document.getElementById("start-game-btn").addEventListener("click", function() {
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
    if (minutes < 2 ) {
        alert("Game time must be at least 02:00.");
        return;
    }

    // Save the configuration to localStorage
    localStorage.setItem("shootKey", shootKey);
    localStorage.setItem("gameTime", gameTime);
    localStorage.setItem("spaceshipColor", spaceshipColor);

    // Redirect to the game page
    window.location.href = "game.html"; // Redirect to the game page
});
