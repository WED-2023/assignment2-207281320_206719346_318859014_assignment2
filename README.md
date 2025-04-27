# Void Wars

- 206719346
- 207281320
- 318859014

https://wed-2023.github.io/assignment2-207281320_206719346_318859014_assignment2/

## How to Play Void Wars:

Login and go to the Configuration screen.
Choose a time duration (minimum 2 minutes) and set your firing key — we recommend using the Spacebar.

Use the arrow keys to move your ship and your firing key to shoot.
You have 3 lives. Eliminate all enemies before time runs out or you lose all lives.

Each enemy row gives a different score: top row 20 points, then 15, 10, and 5 for the bottom row.

⚠️ Enemies move faster every 5 seconds for the first 20 seconds — stay sharp!

# Challanges:

- No plugins or templates were used.

1.  While developing the game, we encountered an issue where multiple event listeners were being attached accidentally whenever a new game was created inside an active game session. As a result, the enemy ships moved faster and faster each time, because the movement and action listeners were stacking up with every new game.

The problem happened because event listeners were added globally without being properly managed. Each time a new game was created inside the session, new listeners were added on top of the existing ones.

To solve this, we made sure to remove the old event listeners before adding new ones. This way, we ensured that only one set of listeners was active at any given time, preventing the stacking issue and keeping the game running smoothly.

2.  We've wanted to create the website as an SPA - single page application, but also keep seperation of concerns, therefor working with seperate html and js files. Because we've created it as an SPA, we've encountered issued were the DOM would't not load correctly with loading a different html file into the main content area, or made it hard to end certain scripts (example: going back from game to main).

The solution we found was to enforce the loadPage function to also run a setup function for certain scripts, enforcing them to load the relevant pieces of code we needed them to initially run when being loaded into the main content area.
