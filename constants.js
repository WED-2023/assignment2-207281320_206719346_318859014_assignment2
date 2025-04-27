// Deafult users
export const USERS = [{ username: "p", password: "testuser" }];

// Dates for registration
export const YEARS = Array.from({ length: 100 }, (_, i) => 2024 - i);
export const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
export function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

// Deafault config
export const CONFIG = {
  shootKey: "",
  gameTime: 120,
  spaceshipColor: "blue",
};

// Page to script mapper
// Used for the loadpage() function to load the needed js script
export const PAGE_SCRIPT = {
  "login.html": "./auth.js",
  "register.html": "./auth.js",
  "game.html": "./game.js",
  "config.html": "./config.js",
};
