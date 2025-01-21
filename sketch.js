// Major Project
// Syhon
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// I'm thinking to change the project to a flat view and 2D game, but still have the same details for the rest mostly (for ideas).

// Plans: 1. Opponents' actions  2. Laser collison with opponents  3. Start screen  4. Game over screen  5. Player HP system
// 6. Make level map  7. Video cutscenes  --8. Laser border


// class Player {
//   constructor(squareX, squareY, squareSize, color) {
//     this.x = squareX;
//     this.y = squareY;
//     this.size = squareSize;
//     this.color = color;
//   }

//   display() {
//     fill("red");
//     square(this.x, this.y, this.size);
//   }
// }


// Opponent ideas: 1. Moving  2. Aim for player with laser--examples p5  3. Line of circles/or a rectangle rotating--examples p5  4. Boss character
// Moving--bounce movements | Aim--objects being directed to the player's location | Rotate--rotating obstacle | Follow/Dodge--follows player's location | Size increase/decrease | Boss Character

// --saveJSON(laserArray, "examplelevel.json")

//setInterval() --for doing things repeated, from demo (function, milliseconds like 1000 [= 1 second])

//----------------
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
// let testArray = ["a", "b", "c"];
// let testArrayTwo = [];
// let testVariable;

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

let gameScreenState = "start screen"; //"start screen";
let playerPositionRoomState = "start position one";

let currentRoom = 1;
let roomOne;
let roomTwo;
let roomThree;
let roomFour;
let roomFive;
let roomSix;

//let playerIsMobile = true;
let playerIsMovable = true;

let introCutscene;
let gameEndCutscene;
let cutsceneState = "hidden";


// This class gives the ability to display rects that act like moving laser projectiles, with the player's arrow key presses deciding which direction each new rect will go
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


// This class is planned to be used to draw the rooms in the project
// class DrawingLaser {
//   constructor(x, y, w, h) {
//     this.x = x;
//     this.y = y;
//     this.w = w;
//     this.h = h;
//     this.r = 255;
//     this.g = 0;
//     this.b = 0;
//     this.opacity = 255;
//   }

//   display() {
//     fill(this.r, this.g, this.b, this.opacity);
//     rect(this.x, this.y, this.w, this.h);
//   }
// }


// This class gives the ability to display (so far) a circle/circles that moves back and forth from one point on the screen to another
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


//---------------------
function preload() {
  roomOne = loadJSON("1st-room.json", loadRoomDrawing);
  roomTwo = loadJSON("2nd-room.json", loadRoomDrawing);
  roomThree = loadJSON("3rd-room.json", loadRoomDrawing);
  roomFour = loadJSON("4th-room.json", loadRoomDrawing);
  roomFive = loadJSON("5th-room.json", loadRoomDrawing);
  roomSix = loadJSON("6th-room.json", loadRoomDrawing);
  //roomTwo = loadJSON("1st-room-updated.json", loadRoomDrawing);
  //pressTest1 = loadJSON("testroom3.json", loadRoomDrawing);
  //pressTest2 = loadJSON("examplelevel.json", loadRoomDrawing);

  // pressTest1 = loadJSON("testroom3.json", loadRoomDrawing);
  // pressTest2 = loadJSON("examplelevel.json", loadRoomDrawing);
  // let test = loadJSON("examplelevel.json", loadRoomDrawing);
  //loadJSON("testroom3.json", loadRoomDrawing);
  // testVariable = loadJSON("testletters.json");
}


//following JSON p5 example, also using what's in preload()
// function loadData(laserArray) {

// }


// --------------------------------------
function loadRoomDrawing(roomData) {
  //testRoom = [];
  //roomDrawn = [];
  if (roomCounter === 1) {
    for (let shape of roomData) {
      //laser = new Laser(squareX, squareY, LEFT_AND_RIGHT_LASER_WIDTH, LEFT_AND_RIGHT_LASER_HEIGHT);
      let x = shape.x;
      let y = shape.y;
      let w = shape.w;
      let h = shape.h;
      //roomDrawn.push(new Laser(x, y, w, h));
      roomArray.push(new Laser(x, y, w, h));
      //console.log(laser);
    }
  }

  else if (roomCounter === 2) {
    for (let shape of roomData) {
      //laser = new Laser(squareX, squareY, LEFT_AND_RIGHT_LASER_WIDTH, LEFT_AND_RIGHT_LASER_HEIGHT);
      let x = shape.x;
      let y = shape.y;
      let w = shape.w;
      let h = shape.h;
      //roomDrawn.push(new Laser(x, y, w, h));
      roomArray2.push(new Laser(x, y, w, h));
      //console.log(laser);
    }
  }

  else if (roomCounter === 3) {
    for (let shape of roomData) {
      //laser = new Laser(squareX, squareY, LEFT_AND_RIGHT_LASER_WIDTH, LEFT_AND_RIGHT_LASER_HEIGHT);
      let x = shape.x;
      let y = shape.y;
      let w = shape.w;
      let h = shape.h;
      //roomDrawn.push(new Laser(x, y, w, h));
      roomArray3.push(new Laser(x, y, w, h));
      //console.log(laser);
    }
  }

  else if (roomCounter === 4) {
    for (let shape of roomData) {
      //laser = new Laser(squareX, squareY, LEFT_AND_RIGHT_LASER_WIDTH, LEFT_AND_RIGHT_LASER_HEIGHT);
      let x = shape.x;
      let y = shape.y;
      let w = shape.w;
      let h = shape.h;
      //roomDrawn.push(new Laser(x, y, w, h));
      roomArray4.push(new Laser(x, y, w, h));
      //console.log(laser);
    }
  }

  else if (roomCounter === 5) {
    for (let shape of roomData) {
      //laser = new Laser(squareX, squareY, LEFT_AND_RIGHT_LASER_WIDTH, LEFT_AND_RIGHT_LASER_HEIGHT);
      let x = shape.x;
      let y = shape.y;
      let w = shape.w;
      let h = shape.h;
      //roomDrawn.push(new Laser(x, y, w, h));
      roomArray5.push(new Laser(x, y, w, h));
      //console.log(laser);
    }
  }

  else if (roomCounter === 6) {
    for (let shape of roomData) {
      //laser = new Laser(squareX, squareY, LEFT_AND_RIGHT_LASER_WIDTH, LEFT_AND_RIGHT_LASER_HEIGHT);
      let x = shape.x;
      let y = shape.y;
      let w = shape.w;
      let h = shape.h;
      //roomDrawn.push(new Laser(x, y, w, h));
      roomArray6.push(new Laser(x, y, w, h));
      //console.log(laser);
    }
  }
  roomCounter++;
}

//I have an idea to use testletters.json in the project to see if it can be in the laserArray and be loaded data in the above function, maybe coded a little bit different than what's above in the function.


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  introCutscene = createVideo(["IntroCutscene.mp4"]);
  gameEndCutscene = createVideo(["GameEndCutscene.mp4"]);
  //video = createVideo(["IntroCutscene.mp4"]);
  //video.hide();
  circleX = windowWidth/2 + 100; //200
  circleY = windowHeight/2 + 200;
  //angleMode(DEGREES);
  // setInterval(playerHpSystem(), 200);
  //loadJSON("examplelevel.json", loadLaserDrawing);
  //console.log(laserArray);
  //console.log(exampleLevel);
  //loadLaserDrawing(); //-------------------
  //console.log(gameLevelRoom);
  // testArrayTwo = testVariable;
  // console.log(testArrayTwo);
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
    playerRoomPositionChanger();
    roomStateChanger();
    //circle(mouseX, mouseY, 20);
    //displayOpponents();
    displayPlayer();
    movementWASD();
    //drawLazer();
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

    //------------------------------
    for (let shape of roomDrawn) {
      //laser.move();
      shape.display();
    }

    opponentDraw();

    for (let opponent of opponentArray) {
      opponent.display();
      opponent.move();
      opponentAndPlayerCollisionDetection(opponent);
    }

    //movingOpponent(); //With angleMode(DEGREES) in setup a part of this, from rotate demo on p5js website

    displayPlayerStats();
    //addPlayerLasers();
    //displayLaserAmountTest();
    // if (playerLaserAmount < 10) {
    //   setInterval(addLasers(), 100000000000000);
    // }
  }
}


// This function displays the start screen of the game
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


//
function cutscenePlayerAndSkipper() {
  if (gameScreenState === "intro cutscene") {
    image(introCutscene, 5, 1);
    introCutscene.loop();
    gameEndCutscene.hide();
    if (key === "c") {
      //cutsceneState = "hidden";
      introCutscene.hide();
      gameScreenState = "start game";
    }
  }
  else if (gameScreenState === "game end cutscene") {
    image(gameEndCutscene, 5, 1);
    gameEndCutscene.loop();
    if (key === "c") {
      //cutsceneState = "hidden";
      gameEndCutscene.hide();
      gameScreenState = "start game";
    }
  }
  //cutsceneState = "playing";
  //console.log(cutsceneState);
  // if (mouseIsPressed) {
  //   if (cutsceneState === "hidden") {
      
  //   }
  // }

  // if (mouseIsPressed && cutsceneState === "playing") {
  //   cutsceneState = "hidden";
  //   video.hide();
  //   console.log(cutsceneState);
  // }
  // else if (cutsceneState === "playing") {
  //   cutsceneState = "hidden";
  //   video.hide();
  //   console.log(cutsceneState);
  // }
  //gameScreenState = "start game";
  // if (skipCutscene === false) {
    
  // }
  // else {
    
  // }
}


// This function displays the game over screen of the game
function displayGameOverScreen() {
  fill("orange");
  textSize(200);
  text("Game Over", width/2 - 500, height/2);
  textSize(150);
  text("Restart to Play Again", width/2 - 700, height/2 + 200);
  // if (mouseIsPressed) {
  //   playerHp = 0;
  //   playerHpPercentage = 0;
  //   gameScreenState = "start game";
  // }
}


//
function playerRoomPositionChanger() {
  // if (playerPositionRoomState === "start position one") {
  //   squareX = 190;
  //   squareY = 450;
  //   playerPositionRoomState = "movable";
  //   //playerPositionRoomState = "start position two";
  //   console.log("test");
  // }
  // if (playerPositionRoomState === "start position two") {
  //   //console.log("position2");
  //   //console.log(playerPositionRoomState);
  //   squareX = 200;
  //   squareY = 200;
  //   playerPositionRoomState = "immovable";
  // }
}


//
function roomStateChanger() {
  if (currentRoom === 1) {
    //playerIsMovable = false;
    roomDrawn = roomArray;
    // squareX = 190;
    // squareY = 450;
    // playerIsMovable = true;
  }
  if (currentRoom === 2) {
    //playerIsMovable = false;
    roomDrawn = roomArray2;
    playerPositionRoomState === "start position two";
    //console.log(playerPositionRoomState);
    // squareX = 200;
    // squareY = 200;
    // playerIsMovable = true;
    //console.log(playerPositionRoomState);
  }
}


// This function displays the opponents -- planned to be in the thought of later levels.
// function displayOpponents() {
//   fill("green");
//   circle(circleX, circleY, circleDiameter);
// }


// This function displays the player.
function displayPlayer() {
  fill("red");
  square(squareX, squareY, squareSize);
}


// This function allows the player to move the red square character on the screen by WASD key pressing. -- Also, the player is planned to have a laser attack by using the arrow keys.
function movementWASD() {
  //console.log(playerIsMobile);
  //if (playerIsMobile) {
  // if (squareX >! width - squareSize) {
  //   playerPositionRoomState = "moved";
  //   console.log(playerPositionRoomState);
  //   //console.log("test");
  // }
  //console.log(playerPositionRoomState);
    
  //}

  //if (playerIsMovable === true) {
  // if (playerPositionRoomState === "movable") {
  //   // else {
  //   // //   console.log("testposition");
  //   // // }
    
  // }
  //console.log(playerIsMovable);
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

  // if (keyIsDown(81) === true) { //q
  //   roomDrawn = roomArray;
  // }
  // else {
  //   roomDrawn = roomArray2;
  // }

  if (keyIsDown(38) === true) { //up arrow
    // setInterval(laserProjectile("up"), 10000);
    laserProjectile("up");
  }

  if (keyIsDown(37) === true) { //left arrow
    // setInterval(laserProjectile("left"), 2000);
    laserProjectile("left");
  }

  if (keyIsDown(40) === true) { //down arrow
    // setInterval(laserProjectile("down"), 2000);
    laserProjectile("down");
  }

  if (keyIsDown(39) === true) { //right arrow
    // setInterval(laserProjectile("right"), 2000);
    laserProjectile("right");
  }
}

// if (keyIsDown(87) === true || keyIsDown(65) === true || keyIsDown(83) === true || keyIsDown(68) === true) {
//   playerIsMovable = true;
//   //console.log(playerIsMovable);
//   //}
// }


//
function laserProjectile(arrowedDirection) {
  if (arrowedDirection === "up" && playerLaserAmount > 0) {
    let playerLaser = new Laser(squareX, squareY, UP_AND_DOWN_LASER_WIDTH, UP_AND_DOWN_LASER_HEIGHT, arrowedDirection);
    laserArray.push(playerLaser);
    // if (playerLaserAmount >= 0) {
    //   playerLaserAmount--;
    // }
  }

  if (arrowedDirection === "left" && playerLaserAmount > 0) {
    // rect(squareX, squareY, LASER_WIDTH, LASER_HEIGHT);
    let playerLaser = new Laser(squareX, squareY, LEFT_AND_RIGHT_LASER_WIDTH, LEFT_AND_RIGHT_LASER_HEIGHT, arrowedDirection);
    laserArray.push(playerLaser);
    // if (playerLaserAmount >= 0) {
    //   playerLaserAmount--;
    // }
  }

  if (arrowedDirection === "down" && playerLaserAmount > 0) {
    // rect(squareX, squareY, LASER_WIDTH, LASER_HEIGHT);
    let playerLaser = new Laser(squareX, squareY, UP_AND_DOWN_LASER_WIDTH, UP_AND_DOWN_LASER_HEIGHT, arrowedDirection);
    laserArray.push(playerLaser);
    // if (playerLaserAmount >= 0) {
    //   playerLaserAmount--;
    // }
  }

  if (arrowedDirection === "right" && playerLaserAmount > 0) {
    // rect(squareX, squareY, LASER_WIDTH, LASER_HEIGHT);
    let playerLaser = new Laser(squareX, squareY, LEFT_AND_RIGHT_LASER_WIDTH, LEFT_AND_RIGHT_LASER_HEIGHT, arrowedDirection);
    laserArray.push(playerLaser);
    // if (playerLaserAmount >= 0) {
    //   playerLaserAmount--;
    // }
  }
}


function addPlayerLasers() {
  if (playerLaserAmount < 10) {
    setInterval(addLasers(), 10000);
  }
}


function addLasers() {
  playerLaserAmount++;
}


function displayLaserAmountTest() {
  fill("green");
  textSize(200);
  text(playerLaserAmount, width/2, height/2);
}


//Check for collision by checking the shape's location before the player shape actually collides

//
function opponentDraw() {
  // if (opponentDrawState === "room one") {
  //   opponentArray.push(new Opponent(windowWidth/2 + 100, windowHeight/2 + 200));
  //   opponentDrawState = "room stable";
  // }
  // if (currentRoom === 2) {
  //   opponentDrawState = "room two";
  // }

  // else if (currentRoom === 3) {
  //   opponentDrawState = "room three";
  // }

  // else if (currentRoom === 4) {
  //   opponentDrawState = "room four";
  // }

  // else if (currentRoom === 5) {
  //   opponentDrawState = "room five";
  // }

  // else if (currentRoom === 6) {
  //   opponentDrawState = "room six";
  // }

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


//
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

    //currentRoom++;
    // if (playerPositionRoomState === "start position one") {
    //   playerPositionRoomState = "start position two";
    // }
    //playerPositionRoomState === "start position two";
    // if (playerPositionRoomState === "start position one") {
    //   playerPositionRoomState === "start position two";
    //   console.log("2");
    // }
    //console.log("room" + currentRoom);
  }
  //   if (current === "room one") {
  //     roomState = "room two";
  //   }
  //   else if (roomState === "room two") {
  //     roomState = "room three";
  //   }
  // }

  // if (squareX < 0) { 
  //   console.log("test");
  // }
  // else if (squareY > height - squareSize) {
  //   console.log("test2");
  // }
}


//squareX > width - squareSize || squareY < 0 ||


//
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

  stroke("white"); //fix stroke note
  fill("red");
  stroke("green"); //final stroke result green here
  square(50, 25, squareSize);
  strokeWeight(2);
  textSize(50);
  text(playerHpPercentage + "%", 500, 68);
}


//
function playerHpSystem() {
  fill("red");
  rect(50 + 80, 35, squareSize - 50 + playerHp, squareSize - 20);
  // playerHp++;
  // if (playerHpPercentage < 100) {
  //   playerHpPercentage++;
  // }
}


//
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


//
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
//-----------------------------------

// So far plan notes: Opponent and player interaction.  Room drawing/drawn, and checking collision with player.  Fix/clear code.


// function drawLazer() {
//   if (mouseIsPressed === true) {
//     fill("red");
//     square(mouseX, mouseY, squareSize);
//     text("click", mouseX, mouseY);
//     console.log("click");
//   }
// }


// const CYL_Y = 0;
// let boxY = 0;
// let boxX = 10;
// let boxZ = 10;
// let cylX = 100;
// let cylZ = 100;

// let camX = 0;
// let camY = -300;
// let camZ = 100;

// let gameGrid;
// let cellSize;
// let colorState = "red";

// function setup() {
//   createCanvas(windowWidth, windowHeight, WEBGL);
//   debugMode();
//   cellSize = height/12;
//   //gameGrid = generateGrid(boxX, boxY);
// }

// function draw() {
//   background(220);
//   //circle(mouseX, mouseY, 100);
//   orbitControl();
//   charactersDisplay();
//   //fill("green");
//   //camera(camX, camY, camZ);
//   //square(100, 200, 25);
//   gameBorder();
//   //sphereDisplay();
//   //displayGrid();
//   //box(25, 125, 25, 2, 100);
// }

// function keyPressed() {
//   if (key === "w") {
//     boxZ -= 100;
//     //camZ -= 100;
//   }
//   if (key === "a") {
//     boxX -= 100;
//   }
//   if (key === "s") {
//     boxZ += 100;
//   }
//   if (key === "d") {
//     boxX += 100;
//   }
//   if (key === " ") {
//     boxY -= 100;
//   }
//   if (key === "1") {
//     boxY += 100;
//   }
// }

// function charactersDisplay() {
//   push();
//   translate(15, 0, 20);
//   fill("green");
//   sphere(40);
//   pop();
//   translate(boxX, boxY, boxZ + 150);
//   fill("red");
//   box();
// }

// function gameBorder() {
//   push();
//   translate(100, 0, -350);
//   fill("orange");
//   box(1000, 500, 50);
//   pop();
//   push();
//   translate(1000, 0, 50);
//   fill("orange");
//   box(800, 700, 1000);
//   pop();
//   // push();
//   // translate(100, 0, 100);
//   // fill("orange");
//   // box(50, 500, 200);
//   // pop();
//   // push();
//   // translate(-100, 0, 100);
//   // fill("orange");
//   // box(50, 500, 200);
//   // pop();
// }

// function sphereDisplay() {
//   push();
//   translate(-50, 0, -100);
//   fill('red');
//   sphere(50);
//   pop();

//   push();
//   translate(0, -100, -300);
//   fill('green');
//   sphere(50);
//   pop();

//   push();
//   translate(25, 25, 50);
//   fill('blue');
//   sphere(50);
//   pop();
// }

// function generateGrid(cols, rows) {
//   let newGrid = [];
//   for (let y = 0; y < rows; y++) {
//     for (let x = 0; x < cols; x++) {
//       // if (random(100) < 50) {
//       //   newGrid[y].push(0);
//       // }
//       // else {
//       //   newGrid[y].push(1);
//       // }
//       //newGrid[y].push(Math.floor(random(255)));
//     }
//   }
//   return newGrid;
// }

// function displayGrid() {
//   //let color = 0;
//   let bw = 20;
//   let bh = 10;
//   let bd = 1;
//   for (let y = 0; y < 1; y++) {
//     for (let x = 0; x < 1; x++) {
//       // if (gameGrid[y][x] === 0) {
//       //   fill("black");
//       // }
//       // else if (gameGrid[y][x] === 1) {
//       //   fill("white");
//       // }
//       //fill(random(255), random(255), random(255));
//       //fill(random(255));
//       // if (colorState === "red") {
//       //   fill(colorState);
//       //   box(boxX * cellSize, BOX_Y * cellSize, boxZ * cellSize);
//       //   colorState = "green";
//       // }
//       // else if (colorState === "green") {
//       //   fill(colorState);
//       //   box(boxX * cellSize, BOX_Y * cellSize, boxZ * cellSize);
//       //   colorState = "red";
//       // }
//       if (y === 0) {
//         fill("orange");
//       }
//       else if (y === 1) {
//         fill("green");
//       }
//       box(bw * cellSize, bh * cellSize, bd * cellSize);
//       bw += 5;
//       bh += 5;
//       bd += 5;
//     }
//   }
// }