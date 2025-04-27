import { CONFIG as DEFAULT_CONFIG } from "./constants.js";
import { loadPage } from "./script.js";

export function setup() {
  const form = document.getElementById("config-form");
  const shootInput = document.getElementById("shoot-key");
  const gameTimeInput = document.getElementById("game-time");
  const colorSelect = document.getElementById("spaceship-color");

  const storedConfig =
    JSON.parse(localStorage.getItem("gameConfig")) || DEFAULT_CONFIG;

  // Populate form with values
  // shootInput.value = storedConfig.shootKey;
  shootInput.dataset.keyValue = storedConfig.shootKey;
  shootInput.value = storedConfig.shootKey === " " ? "Space" : storedConfig.shootKey;

  gameTimeInput.value = storedConfig.gameTime;
  colorSelect.value = storedConfig.spaceshipColor;

  // Listen for key input
  // shootInput.addEventListener("keydown", (e) => {
  //   e.preventDefault();
  //   if (/^[a-zA-Z ]$/.test(e.key)) {
  //     shootInput.value = e.key;
  //   }
  // });
  shootInput.addEventListener("keydown", (e) => {
    e.preventDefault();
  
    // Save the actual key value (what should be used in the game)
    const key = e.key;
  
    if (/^[a-zA-Z]$/.test(key) || key === " ") {
      shootInput.dataset.keyValue = key; // store real key in a data attribute
      shootInput.value = key === " " ? "Space" : key; 
    }
  });
  

  // Save on submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let gameTime = parseInt(gameTimeInput.value, 10);
    if (isNaN(gameTime) || gameTime < 120) {
      alert("Game time must be at least 120 seconds.");
      return;
    }
    const config = {
      // shootKey: shootInput.value,
      shootKey: shootInput.dataset.keyValue || shootInput.value, 
      gameTime: gameTimeInput.value,
      spaceshipColor: colorSelect.value,
    };

    localStorage.setItem("gameConfig", JSON.stringify(config));
    alert("Config saved!");
    loadPage("game.html");
  });
}
