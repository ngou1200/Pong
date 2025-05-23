# Pong Game

A classic Pong game implemented with HTML, CSS, and JavaScript. This project features adjustable AI difficulty levels.

## Table of Contents

- [Features](#features)
- [How to Play](#how-to-play)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Features

* **Player vs. AI Gameplay**: Play against a computer-controlled opponent.
* **Adjustable AI Difficulty**: Choose from Beginner, Intermediate, Advanced, and Expert AI levels.
    * **Beginner**: AI moves at a speed of 2 units.
    * **Intermediate**: AI moves at a speed of 4 units.
    * **Advanced**: AI matches the player's paddle speed of 6 units.
    * **Expert**: AI moves faster than the player at a speed of 8 units.
* **Score Tracking**: Displays real-time player and AI scores.
* **Responsive Controls**: Use 'W' and 'S' keys to move the player paddle up and down.
* **Dynamic Ball Physics**: Ball speed increases slightly upon paddle collision, and angle changes based on hit point.
* **Visual Elements**: Includes a dashed net in the center and distinct paddles and ball.

## How to Play

1.  **Open `index.html`**: Simply open the `index.html` file in your web browser.
2.  **Control Player Paddle**:
    * Press `W` to move your paddle up.
    * Press `S` to move your paddle down.
3.  **Select AI Difficulty**: Click on the "Beginner", "Intermediate", "Advanced", or "Expert" buttons to change the AI's skill level. The currently active difficulty button will be highlighted.
4.  **Score Points**: Earn a point when the ball passes the AI's paddle (right side). The AI scores when the ball passes your paddle (left side).
5.  **Game Reset**: The ball resets to the center after each score, alternating its initial horizontal direction.

## Project Structure

* `index.html`: The main HTML file that sets up the game canvas, score display, and difficulty selection buttons.
* `style.css`: Provides the styling for the game container, canvas, score display, and difficulty buttons.
* `script.js`: Contains the core game logic, including:
    * Canvas setup and drawing functions.
    * Game state variables (paddle positions, ball position/speed, scores).
    * Input handling for player controls.
    * AI movement logic based on selected difficulty.
    * Ball collision detection and scoring mechanics.
    * The main game loop (`gameLoop`) that updates and renders the game.

## Customization

You can easily customize various aspects of the game by modifying `script.js`:

* **Paddle Dimensions**: Adjust `PADDLE_WIDTH` and `PADDLE_HEIGHT`.
* **Ball Size**: Change `BALL_SIZE`.
* **Player Paddle Speed**: Modify `PADDLE_SPEED`.
* **AI Speeds**: Tweak the values in the `AI_SPEEDS` object for each difficulty level.
* **Ball Initial Speed/Behavior**: Adjust `ballSpeedX` and `ballSpeedY` in `resetBall()`.
* **Collision Physics**: Alter the `0.35` multiplier for `ballSpeedY` calculation during paddle collisions to change the angle effect. You can also modify the `1.05` speed increase or the `15` speed cap.

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open-source and available under the [MIT License](LICENSE).
