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
  shootInput.value = storedConfig.shootKey;
  gameTimeInput.value = storedConfig.gameTime;
  colorSelect.value = storedConfig.spaceshipColor;

  // Listen for key input
  shootInput.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (/^[a-zA-Z ]$/.test(e.key)) {
      shootInput.value = e.key;
    }
  });

  // Save on submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const config = {
      shootKey: shootInput.value,
      gameTime: gameTimeInput.value,
      spaceshipColor: colorSelect.value,
    };

    localStorage.setItem("gameConfig", JSON.stringify(config));
    alert("Config saved!");
    loadPage("game.html");
  });
}
