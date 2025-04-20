// Deafult users
export const USERS = [
  { username: "p", password: "testuser" },
  { username: "123", password: "123" },
];

// Deafault config
export const CONFIG = {
  shootKey: "space",
  gameTime: "02:00",
  spaceshipColor: "blue",
};

// Page to script mapper
// Used for the loadpage() function to load the needed js script
export const PAGE_SCRIPT = {
  "login.html": "./auth.js",
  "register.html": "./auth.js",
};
