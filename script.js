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
