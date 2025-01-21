// Major Project
// Syhon
// January 21 2025
//
// Extra for Experts:
// I would say the experimentation of loading and saving JSON files differently from how we learned how to use JSON files in class.


let squareX = 125;
let squareY = 450;
let squareSize = 50;

let newSquareX = 740;
let newSquareY = 400;

let playerHp = 0;
let playerHpPercentage = 0;
let playerHpArray = [];

const LEFT_AND_RIGHT_LASER_WIDTH = 200;
const UP_AND_DOWN_LASER_HEIGHT = 200;
const UP_AND_DOWN_LASER_WIDTH = 20;
const LEFT_AND_RIGHT_LASER_HEIGHT = 20;

let circleX;
let circleY;
let circleDiameter = 50;

testShapeX = 800;
testShapeY = 400;
testShapeW = 20;
testShapeH = 200;

let playerLaserAmount = 10;

let opponentDrawState = "room two";
let opponentArray = [];
let laserArray = [];
let gameLevelRoom = [];

let exampleLevel = [];
let testRoom = [];
let roomDrawn = [];
let roomArray = [];
let roomArray2 = [];
let roomArray3 = [];
let roomArray4 = [];
let roomArray5 = [];
let roomArray6 = [];
let roomCounter = 1;

let playerUpState = "clear";
let playerLeftState = "clear";
let playerDownState = "clear";
let playerRightState = "clear";

let hit = false;

let pressTest1;
let pressTest2;

let gameScreenState = "start screen";
let playerPositionRoomState = "start position one";

let currentRoom = 1;
let roomOne;
let roomTwo;
let roomThree;
let roomFour;
let roomFive;
let roomSix;

let playerIsMovable = true;

let introCutscene;
let gameEndCutscene;
let cutsceneState = "hidden";


// This class gives the ability to display rects that act like moving laser projectiles, with the player's arrow key presses deciding which direction each new rect will go.
class Laser {
  constructor(x, y, w, h, arrowedDirection) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.laserDirection = arrowedDirection;
    this.dx = 5;
    this.dy = 5;
    this.r = 255;
    this.g = 50;
    this.b = 0;
    this.opacity = 255;
  }

  display() {
    fill(this.r, this.g, this.b, this.opacity);
    rect(this.x, this.y, this.w, this.h);
  }

  move() {
    if (this.laserDirection === "up") {
      this.y -= this.dy;
      console.log("move");
    }

    if (this.laserDirection === "left") {
      this.x -= this.dx;
    }

    if (this.laserDirection === "down") {
      this.y += this.dy;
    }

    if (this.laserDirection === "right") {
      this.x += this.dx;
    }
  }
}


// This class gives the ability to display a circle/circles that moves back and forth from one point on the screen to another.
class Opponent {
  constructor(x, y) {
    this.x = x;
    this.originalX = x;
    this.y = y;
    this.d = 50;
    this.dx = 5;
    this.dy = 5;
    this.color = "green";
    this.movementState = "left";
    this.hp = 0;
  }

  display() {
    fill(this.color);
    circle(this.x, this.y, this.d);
  }

  move() {
    if (this.movementState === "left") {
      this.x -= this.dx;
      if (this.x <= 200) {
        this.movementState = "right";
      }
    }
    else if (this.movementState === "right") {
      this.x += this.dx;
      if (this.x === this.originalX) {
        this.movementState = "left";
      }
    }
  }
}


// In the preload, all the rooms saved and loaded from me drawing with lasers are preloaded here in the code.
function preload() {
  roomOne = loadJSON("1st-room.json", loadRoomDrawing);
  roomTwo = loadJSON("2nd-room.json", loadRoomDrawing);
  roomThree = loadJSON("3rd-room.json", loadRoomDrawing);
  roomFour = loadJSON("4th-room.json", loadRoomDrawing);
  roomFive = loadJSON("5th-room.json", loadRoomDrawing);
  roomSix = loadJSON("6th-room.json", loadRoomDrawing);
}


// This function puts all of the drawing rects in different arrays to have ready to be drawn on the canvas when the player progresses through the game.
function loadRoomDrawing(roomData) {
  if (roomCounter === 1) {
    for (let shape of roomData) {
      let x = shape.x;
      let y = shape.y;
      let w = shape.w;
      let h = shape.h;
      roomArray.push(new Laser(x, y, w, h));
    }
  }

  else if (roomCounter === 2) {
    for (let shape of roomData) {
      let x = shape.x;
      let y = shape.y;
      let w = shape.w;
      let h = shape.h;
      roomArray2.push(new Laser(x, y, w, h));
    }
  }

  else if (roomCounter === 3) {
    for (let shape of roomData) {
      let x = shape.x;
      let y = shape.y;
      let w = shape.w;
      let h = shape.h;
      roomArray3.push(new Laser(x, y, w, h));
    }
  }

  else if (roomCounter === 4) {
    for (let shape of roomData) {
      let x = shape.x;
      let y = shape.y;
      let w = shape.w;
      let h = shape.h;
      roomArray4.push(new Laser(x, y, w, h));
    }
  }

  else if (roomCounter === 5) {
    for (let shape of roomData) {
      let x = shape.x;
      let y = shape.y;
      let w = shape.w;
      let h = shape.h;
      roomArray5.push(new Laser(x, y, w, h));
    }
  }

  else if (roomCounter === 6) {
    for (let shape of roomData) {
      let x = shape.x;
      let y = shape.y;
      let w = shape.w;
      let h = shape.h;
      roomArray6.push(new Laser(x, y, w, h));
    }
  }
  roomCounter++;
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  introCutscene = createVideo(["IntroCutscene.mp4"]);
  gameEndCutscene = createVideo(["GameEndCutscene.mp4"]);
  circleX = windowWidth/2 + 100;
  circleY = windowHeight/2 + 200;
}


function draw() {
  background(220);
  if (gameScreenState === "start screen") {
    displayStartScreen();
  }
  else if (gameScreenState === "intro cutscene" || gameScreenState === "game end cutscene") {
    cutscenePlayerAndSkipper();
  }
  else if (gameScreenState === "game over") {
    displayGameOverScreen();
  }
  else {
    roomStateChanger();
    displayPlayer();
    movementWasdAndLaserArrowKeys();
    for (let laser of laserArray) {
      opponentAndLaserCollisionDetection(laser);
      if (laser.x < 0 || laser.x > width - laser.w || laser.y < 0 || laser.y > height - laser.h) {
        let index = laserArray.indexOf(laser);
        laserArray.splice(index, 1);
      }
      else {
        laser.move();
        laser.display();
      }
    }

    playerCanvasCollisionDectection();

    for (let shape of roomDrawn) {
      shape.display();
    }

    opponentDraw();

    for (let opponent of opponentArray) {
      opponent.display();
      opponent.move();
      opponentAndPlayerCollisionDetection(opponent);
    }

    displayPlayerStats();
  }
}


// This function displays the start screen of the game.
function displayStartScreen() {
  fill("orange");
  rect(width/2 - 360, height/2 - 305, 700, 200);
  fill("green");
  circle(circleX + 74, circleY - 410, circleDiameter + 70);
  fill("black");
  square(width/2 - 110, height/2 - 262, squareSize + 70);
  fill("red");
  textSize(200);
  text("Shapes", width/2 - 350, height/2 - 150);
  text("Click to begin", width/2 - 600, height/2 + 100);
  textSize(30);
  text("controls: wasd is for movement, and arrow keys for launching lasers. Press the C key to skip cutscenes.", width/2 - 680, height/2 + 220);
  if (mouseIsPressed) {
    gameScreenState = "intro cutscene";
  }
}


// This function displays the cutscenes of the project, and gives the user the ability to skip the cutscenes by pressing C.
function cutscenePlayerAndSkipper() {
  if (gameScreenState === "intro cutscene") {
    image(introCutscene, 5, 1);
    introCutscene.loop();
    gameEndCutscene.hide();
    if (key === "c") {
      introCutscene.hide();
      gameScreenState = "start game";
    }
  }
  else if (gameScreenState === "game end cutscene") {
    image(gameEndCutscene, 5, 1);
    gameEndCutscene.loop();
    if (key === "c") {
      gameEndCutscene.hide();
      gameScreenState = "start game";
    }
  }
}


// This function displays the game over screen of the game
function displayGameOverScreen() {
  fill("orange");
  textSize(200);
  text("Game Over", width/2 - 500, height/2);
  textSize(150);
  text("Restart to Play Again", width/2 - 700, height/2 + 200);
}


//
function roomStateChanger() {
  if (currentRoom === 1) {
    roomDrawn = roomArray;
  }
  if (currentRoom === 2) {
    roomDrawn = roomArray2;
    playerPositionRoomState === "start position two";
  }
}


// This function displays the player.
function displayPlayer() {
  fill("red");
  square(squareX, squareY, squareSize);
}


// This function allows the player to move the red square character on the screen by WASD key pressing. Also, the has a laser attack by using the arrow keys.
function movementWasdAndLaserArrowKeys() {
  let moveSpeed = 5;
  if (keyIsDown(87) === true) { //w
    newSquareY -= moveSpeed;
    let blocked = false;
    for (let shape of roomDrawn) {
      if (collideRectRect(shape.x, shape.y, shape.w, shape.h, newSquareX, newSquareY, squareSize, squareSize)) {
        blocked = true;
        break;
      }
    }
    if (!blocked) {
      squareY -= moveSpeed;
    }
    else {
      newSquareY = squareY;
    }
  }

  if (keyIsDown(65) === true) { //a
    newSquareX -= moveSpeed;
    let blocked = false;
    for (let shape of roomDrawn) {
      if (collideRectRect(shape.x, shape.y, shape.w, shape.h, newSquareX, newSquareY, squareSize, squareSize)) {
        blocked = true;
        break;
      }
    }
    if (!blocked) {
      squareX -= moveSpeed;
    }
    else {
      newSquareX = squareX;
    }
  }

  if (keyIsDown(83) === true) { //s
    newSquareY += moveSpeed;
    let blocked = false;
    for (let shape of roomDrawn) {
      if (collideRectRect(shape.x, shape.y, shape.w, shape.h, newSquareX, newSquareY, squareSize, squareSize)) {
        blocked = true;
        break;
      }
    }
    if (!blocked) {
      squareY += moveSpeed;
    }
    else {
      newSquareY = squareY;
    }
  }

  if (keyIsDown(68) === true) { //d
    newSquareX += moveSpeed;
    let blocked = false;
    for (let shape of roomDrawn) {
      if (collideRectRect(shape.x, shape.y, shape.w, shape.h, newSquareX, newSquareY, squareSize, squareSize)) {
        blocked = true;
        break;
      }
    }
    if (!blocked) {
      squareX += moveSpeed;
    }
    else {
      newSquareX = squareX;
    }
  }

  if (keyIsDown(38) === true) { //up arrow
    laserProjectile("up");
  }

  if (keyIsDown(37) === true) { //left arrow
    laserProjectile("left");
  }

  if (keyIsDown(40) === true) { //down arrow
    laserProjectile("down");
  }

  if (keyIsDown(39) === true) { //right arrow
    laserProjectile("right");
  }
}


// This function makes the decisions on how the lasers from the player will be displayed.
function laserProjectile(arrowedDirection) {
  if (arrowedDirection === "up" && playerLaserAmount > 0) {
    let playerLaser = new Laser(squareX, squareY, UP_AND_DOWN_LASER_WIDTH, UP_AND_DOWN_LASER_HEIGHT, arrowedDirection);
    laserArray.push(playerLaser);
  }

  if (arrowedDirection === "left" && playerLaserAmount > 0) {
    let playerLaser = new Laser(squareX, squareY, LEFT_AND_RIGHT_LASER_WIDTH, LEFT_AND_RIGHT_LASER_HEIGHT, arrowedDirection);
    laserArray.push(playerLaser);
  }

  if (arrowedDirection === "down" && playerLaserAmount > 0) {
    let playerLaser = new Laser(squareX, squareY, UP_AND_DOWN_LASER_WIDTH, UP_AND_DOWN_LASER_HEIGHT, arrowedDirection);
    laserArray.push(playerLaser);
  }

  if (arrowedDirection === "right" && playerLaserAmount > 0) {
    let playerLaser = new Laser(squareX, squareY, LEFT_AND_RIGHT_LASER_WIDTH, LEFT_AND_RIGHT_LASER_HEIGHT, arrowedDirection);
    laserArray.push(playerLaser);
  }
}


// This function displays the circle opponents of the game.
function opponentDraw() {
  if (opponentDrawState === "room two") {
    opponentArray = [];
    opponentArray.push(new Opponent(windowWidth/2 + 100, windowHeight/2 + 200));
    opponentArray.push(new Opponent(windowWidth/2, windowHeight/2 + 200));
    opponentDrawState = "displayed";
  }

  else if (opponentDrawState === "room three") {
    opponentArray = [];
    opponentArray.push(new Opponent(windowWidth/2 + 100, windowHeight/2 + 200));
    opponentArray.push(new Opponent(windowWidth/2 + 100, windowHeight/2 + 200));
    opponentDrawState = "displayed";
  }

  else if (opponentDrawState === "room four") {
    opponentArray = [];
    opponentArray.push(new Opponent(windowWidth/2 + 100, windowHeight/2 + 200));
    opponentArray.push(new Opponent(windowWidth/2 + 100, windowHeight/2 + 200));
    opponentDrawState = "displayed";
  }

  else if (opponentDrawState === "room five") {
    opponentArray = [];
    opponentArray.push(new Opponent(windowWidth/2 + 100, windowHeight/2 + 200));
    opponentArray.push(new Opponent(windowWidth/2 + 100, windowHeight/2 + 200));
    opponentDrawState = "displayed";
  }

  else if (opponentDrawState === "room six") {
    opponentArray = [];
    opponentArray.push(new Opponent(windowWidth/2 + 100, windowHeight/2 + 200));
    opponentDrawState = "displayed";
  }
}


// This function changes the current room displayed in the game based on when the player touches the right side of the canvas.
function playerCanvasCollisionDectection() {
  if (squareX > width - squareSize) {
    if (currentRoom === 1) {
      currentRoom = 2;
      opponentDrawState = "room two";
      roomDrawn = roomArray2;
      squareX = 250;
      squareY = 150;
    }

    else if (currentRoom === 2) {
      currentRoom = 3;
      opponentDrawState = "room three";
      roomDrawn = roomArray3;
      squareX = 1350;
      squareY = 680;
    }

    else if (currentRoom === 3) {
      currentRoom = 4;
      opponentDrawState = "room four";
      roomDrawn = roomArray4;
      squareX = 40;
      squareY = 600;
    }

    else if (currentRoom === 4) {
      currentRoom = 5;
      opponentDrawState = "room five";
      roomDrawn = roomArray5;
      squareX = 720;
      squareY = 670;
    }

    else if (currentRoom === 5) {
      currentRoom = 6;
      opponentDrawState = "room five";
      roomDrawn = roomArray6;
      squareX = 720;
      squareY = 350;
      gameScreenState = "game end cutscene";
    }
  }
}


// This function displays the player's stats/hud of their HP system visually.
function displayPlayerStats() {
  fill("black");
  rect(width/2 - 800, 0, width, 100);
  rect(50 + 80, 35, squareSize + 200, squareSize - 20);

  if (playerHp < 250) {
    setInterval(playerHpSystem(), 100);
  }
  else {
    fill("red");
    rect(50 + 80, 35, squareSize + 200, squareSize - 20);
  }

  fill("red");
  stroke("green");
  square(50, 25, squareSize);
  strokeWeight(2);
  textSize(50);
  text(playerHpPercentage + "%", 500, 68);
}


// This function makes a rect appear on the canvas to represent the player's HP.
function playerHpSystem() {
  fill("red");
  rect(50 + 80, 35, squareSize - 50 + playerHp, squareSize - 20);
}


// This function affects the HP system of the player when the player and an opponent collide on the canvas.
function opponentAndPlayerCollisionDetection(opponent) {
  if (collideRectCircle(squareX, squareY, squareSize, squareSize, opponent.x, opponent.y, opponent.d) && playerHp < 250) {
    playerHpPercentage++;
    playerHp += 2.5;
    console.log("percentage " + playerHpPercentage);
    console.log("hp " + playerHp);
  }
  if (playerHpPercentage === 100) {
    gameScreenState = "game over";
  }
}


// This function affects the hidden HP system of any of the opponents on the canvas when the player's laser(s) collides with the opponent.
function opponentAndLaserCollisionDetection(laser) {
  for (let opponent of opponentArray) {
    if (collideRectCircle(laser.x, laser.y, laser.w, laser.h, opponent.x, opponent.y, opponent.d)) {
      opponent.hp++;
    }
    if (opponent.hp === 1000) {
      let index = opponentArray.indexOf(opponent);
      opponentArray.splice(index, 1);
    }
  }
}