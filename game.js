document.addEventListener("DOMContentLoaded", () => {
    // Canvas and Context
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
  
    // Game Constants
    const gridSize = 20;
    const canvasSize = 600;
    const itemTypes = ["fruit", "vegetable", "water"];
    const environmentFacts = [
      "Recycling 1 ton of paper saves 17 trees and 7,000 gallons of water.",
      "The Amazon rainforest produces 20% of the world's oxygen.",
      "Switching to renewable energy can reduce CO2 emissions by up to 80%.",
      "Each year, 8 million tons of plastic enter the oceans. Reduce plastic usage!",
      "A single tree can absorb about 48 pounds of CO2 annually.",
      "Turning off unused lights can reduce energy consumption by up to 10%.",
      "Oceans absorb about 30% of the carbon dioxide produced by humans.",
      "Composting food waste can reduce landfill waste and create natural fertilizer.",
      "The average person walks 10,000 steps to burn off 1 kilogram of calories.",
      "Planting trees can help combat climate change and reduce greenhouse gas emissions.",
      "Recycling one ton of paper saves 17 trees and 7,000 gallons of water.",
      "Electric cars produce significantly fewer carbon emissions compared to traditional gasoline cars.",
      "Over 8 million metric tons of plastic end up in the oceans every year.",
      "A single tree can absorb approximately 48 pounds of CO2 per year!",
      "The Amazon rainforest is home to over 400 billion trees!",
    ];
  
    // Game Variables
    let snake = [{ x: 100, y: 100 }];
    let snakeDirection = { x: gridSize, y: 0 };
    let items = [];
    let score = 0;
    let isGameOver = false;
  
    // Start the Game
    window.startGame = function startGame() {
      document.getElementById("startScreen").style.display = "none";
      generateItem();
      gameLoop();
    };
  
    // Generate Random Item
    function generateItem() {
      const x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
      const y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
      const type = itemTypes[Math.floor(Math.random() * itemTypes.length)];
      items.push({ x, y, type });
    }
  
    // Draw Snake
    function drawSnake() {
      ctx.fillStyle = "#00FF00";
      for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
      }
    }
  
    // Draw Items
    function drawItems() {
      for (let item of items) {
        ctx.fillStyle = item.type === "fruit" ? "red" : item.type === "vegetable" ? "orange" : "blue";
        ctx.fillRect(item.x, item.y, gridSize, gridSize);
      }
    }
  
    // Move Snake
    function moveSnake() {
      const newHead = {
        x: snake[0].x + snakeDirection.x,
        y: snake[0].y + snakeDirection.y,
      };
  
      snake.unshift(newHead);
  
      // Check if the snake eats an item
      const eatenIndex = items.findIndex(item => item.x === newHead.x && item.y === newHead.y);
      if (eatenIndex !== -1) {
        score++;
        items.splice(eatenIndex, 1);
        generateItem();
      } else {
        snake.pop();
      }
  
      // Check for collisions
      if (
        newHead.x < 0 || newHead.x >= canvasSize ||
        newHead.y < 0 || newHead.y >= canvasSize ||
        snake.some((segment, index) => index !== 0 && segment.x === newHead.x && segment.y === newHead.y)
      ) {
        isGameOver = true;
      }
    }
  
    // Update Score
    function updateScore() {
      document.getElementById("score").textContent = `Score: ${score}`;
    }
  
    // Show Popup
    function showPopup() {
      const randomFact = environmentFacts[Math.floor(Math.random() * environmentFacts.length)];
      document.getElementById("fact").textContent = randomFact;
      document.getElementById("popup").style.display = "block";
    }
  
    // Close Popup
    window.closePopup = function closePopup() {
      document.getElementById("popup").style.display = "none";
    };
  
    // Game Loop
    function gameLoop() {
      if (isGameOver) {
        showPopup();
        return;
      }
  
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      moveSnake();
      drawSnake();
      drawItems();
      updateScore();
  
      setTimeout(gameLoop, 100);
    }
  
    // Handle Key Press
    document.addEventListener("keydown", event => {
      switch (event.key) {
        case "ArrowUp":
          if (snakeDirection.y === 0) {
            snakeDirection = { x: 0, y: -gridSize };
          }
          break;
        case "ArrowDown":
          if (snakeDirection.y === 0) {
            snakeDirection = { x: 0, y: gridSize };
          }
          break;
        case "ArrowLeft":
          if (snakeDirection.x === 0) {
            snakeDirection = { x: -gridSize, y: 0 };
          }
          break;
        case "ArrowRight":
          if (snakeDirection.x === 0) {
            snakeDirection = { x: gridSize, y: 0 };
          }
          break;
      }
    });
  });
  
