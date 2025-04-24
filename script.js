import { PAGE_SCRIPT } from "./constants.js";

/* GLOBAL */
export function loadPage(url) {
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      document.querySelector("main").innerHTML = html;
      attachPageEvents();

      /* IF IT'S STUPID BUT IT WORKS - IT'S NOT STUPID!
      I have so much more appriciation now for JS frameworks. */
      const scriptPath = PAGE_SCRIPT[url];
      if (scriptPath) {
        import(scriptPath).then((mod) => {
          if (typeof mod.setup === "function") {
            mod.setup();
          }
        });
      }
    });
}

document
  .getElementById("nav-home")
  .addEventListener("click", () => loadPage("welcome.html"));

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
  const configBtn = document.getElementById("config-btn");
  if (configBtn) {
    configBtn.addEventListener("click", () => loadPage("config.html"));
  }
}

/* Sound effects */
// Button's hover sound effect
document.addEventListener("DOMContentLoaded", () => {
  const hoverSound = new Audio("sounds/button_hover.mp3");
  // Mouse hover event
  document.addEventListener("mouseover", (event) => {
    const currentTag = event.target.tagName;
    // For Buttons & A
    if (currentTag === "BUTTON" || currentTag === "A") {
      hoverSound.play();
    }
  });
});
