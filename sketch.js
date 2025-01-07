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


let squareX = 740;
let squareY = 400;
let squareSize = 50;

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

let opponentDrawState = "room one";
let opponentArray = [];
let laserArray = [];
let gameLevelRoom = [];
// let testArray = ["a", "b", "c"];
// let testArrayTwo = [];
// let testVariable;

let exampleLevel = [];
let testRoom = [];
let roomDrawn = [];

let playerUpState = "clear";
let playerLeftState = "clear";
let playerDownState = "clear";
let playerRightState = "clear";


//
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


//
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
  loadJSON("testroom3.json", loadRoomDrawing);
  //loadJSON("examplelevel.json", loadRoomDrawing);
  //loadJSON("testroom3.json", loadRoomDrawing);
  // testVariable = loadJSON("testletters.json");
}


//following JSON p5 example, also using what's in preload()
// function loadData(laserArray) {

// }


// --------------------------------------
function loadRoomDrawing(roomData) {
  //testRoom = [];
  for (let shape of roomData) {
    //laser = new Laser(squareX, squareY, LEFT_AND_RIGHT_LASER_WIDTH, LEFT_AND_RIGHT_LASER_HEIGHT);
    let x = shape.x;
    let y = shape.y;
    let w = shape.w;
    let h = shape.h;
    roomDrawn.push(new Laser(x, y, w, h));
    //console.log(laser);
  }
}

//I have an idea to use testletters.json in the project to see if it can be in the laserArray and be loaded data in the above function, maybe coded a little bit different than what's above in the function.


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  circleX = windowWidth/2 + 100; //200
  circleY = windowHeight/2 + 200;
  angleMode(DEGREES);
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
  //circle(mouseX, mouseY, 20);
  //displayOpponents();
  displayPlayer();
  displayTestRect();
  movementWASD();
  //drawLazer();
  for (let laser of laserArray) {
    if (laser.x < 0 || laser.x > width - laser.w || laser.y < 0 || laser.y > height - laser.h) {
      let index = laserArray.indexOf(laser);
      laserArray.splice(index, 1);
      console.log("border");
    }
    else {
      laser.move();
      laser.display();
    }
  }

  //------------------------------
  for (let shape of roomDrawn) {
    //laser.move();
    shape.display();
  }

  opponentDraw();

  for (let opponent of opponentArray) {
    opponent.display();
    opponent.move();
  }

  //movingOpponent(); //With angleMode(DEGREES) in setup a part of this, from rotate demo on p5js website

  displayPlayerStats();

  playerCollisonDetection();
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


// This a temporary function for now to test collison detection for the player's square with a rect shape.
function displayTestRect() {
  fill("yellow");
  rect(testShapeX, testShapeY, testShapeW, testShapeH);
  rect(testShapeX - 100, testShapeY, testShapeW, testShapeH);
}


// This function allows the player to move the red square character on the screen by WASD key pressing. -- Also, the player is planned to have a laser attack by using the arrow keys.
function movementWASD() {
  // for (let laser of laserArray) {
  //   if (squareY > laser.y) {
  //     if (keyIsDown(87) === true) { //w
  //       squareY -= 10;
  //     }
  //   }

  //   if (squareX > laser.x) {
  //     if (keyIsDown(65) === true) { //a
  //       squareX -= 10;
  //     }
  //   }

  //   if (keyIsDown(83) === true) { //s
  //     squareY += 10;
  //   }
  
  //   if (keyIsDown(68) === true) { //d
  //     squareX += 10;
  //   }
  // }

  if (playerUpState === "clear") {
    if (keyIsDown(87) === true) { //w
      squareY -= 10;
    }
  }

  if (playerLeftState === "clear") {
    if (keyIsDown(65) === true) { //a
      squareX -= 10;
    }
  }

  if (playerDownState === "clear") {
    if (keyIsDown(83) === true) { //s
      squareY += 10;
    }
  }

  if (playerRightState === "clear") {
    if (keyIsDown(68) === true) { //d
      squareX += 10;
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
  // if (key === " ") {
  // }
}


//
function laserProjectile(arrowedDirection) {
  if (arrowedDirection === "up") {
    let playerLaser = new Laser(squareX, squareY, UP_AND_DOWN_LASER_WIDTH, UP_AND_DOWN_LASER_HEIGHT, arrowedDirection);
    laserArray.push(playerLaser);
    // playerLaser.display();
    // playerLaser.move(laserDirection);
  }

  if (arrowedDirection === "left") {
    // rect(squareX, squareY, LASER_WIDTH, LASER_HEIGHT);
    let playerLaser = new Laser(squareX, squareY, LEFT_AND_RIGHT_LASER_WIDTH, LEFT_AND_RIGHT_LASER_HEIGHT, arrowedDirection);
    laserArray.push(playerLaser);
    // playerLaser.display();
    // playerLaser.move(laserDirection);
  }

  if (arrowedDirection === "down") {
    // rect(squareX, squareY, LASER_WIDTH, LASER_HEIGHT);
    let playerLaser = new Laser(squareX, squareY, UP_AND_DOWN_LASER_WIDTH, UP_AND_DOWN_LASER_HEIGHT, arrowedDirection);
    laserArray.push(playerLaser);
    // playerLaser.display();
    // playerLaser.move(laserDirection);
  }

  if (arrowedDirection === "right") {
    // rect(squareX, squareY, LASER_WIDTH, LASER_HEIGHT);
    let playerLaser = new Laser(squareX, squareY, LEFT_AND_RIGHT_LASER_WIDTH, LEFT_AND_RIGHT_LASER_HEIGHT, arrowedDirection);
    laserArray.push(playerLaser);
    // playerLaser.display();
    // playerLaser.move(laserDirection);
  }

  // for (let laser of laserArray) {
  //   laser.display();
  //   laser.move(laserDirection);
  // }
}


//
function playerCollisonDetection() {
  // for (let shape of roomDrawn) {
  //   if (squareX >= shape.w) {
  //     playerRightState = "blocked";
  //     //console.log("blocked");
  //   }
  //   else {
  //     playerRightState = "clear";
  //     //console.log("clear");
  //   }
  // }

  if (squareX >= testShapeX - 50) {
    playerRightState = "blocked";
  }
  else {
    playerRightState = "clear";
  }
}

//Check for collision by checking the shape's location before the player shape actually collides

function opponentDraw() {
  if (opponentDrawState === "room one") {
    opponentArray.push(new Opponent(windowWidth/2 + 100, windowHeight/2 + 200));
    opponentDrawState = "room stable";
  }
}


//
// function movingOpponent() {
//   stroke("green");
//   strokeWeight(20);
//   translate(width/2, height/2);
//   rotate(frameCount);
//   line(0, 0, 150, 0);
//   noStroke();
// }


//
function displayPlayerStats() {
  fill("black");
  rect(width/2 - 800, 0, width, 100);
  rect(50 + 80, 35, squareSize + 200, squareSize - 20);
  stroke("white"); //fix stroke note
  fill("red");
  stroke("green"); //final stroke result green here
  square(50, 25, squareSize);
  strokeWeight(2);
  textSize(50);
  text("0%", 500, 68);
}

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
//   gameGrid = generateGrid(boxX, boxY);
// }

// function draw() {
//   background(220);
//   //circle(mouseX, mouseY, 100);
//   //orbitControl();
//   playerDisplay();
//   camera(camX, camY, camZ);
//   square(100, 200, 25);
//   //gameBorder();
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

// function playerDisplay() {
//   translate(boxX, boxY, boxZ);
//   fill("red");
//   box();
// }

// function gameBorder() {
//   push();
//   translate(cylX, CYL_Y, cylZ);
//   fill("orange");
//   box();
//   pop();
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