// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const BOX_Y = 0;
const CYL_Y = 0;
let boxX = 10;
let boxZ = 10;
let cylX = 100;
let cylZ = 100;
let gameGrid;
let cellSize;
let colorState = "red";

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  debugMode();
  cellSize = height/12;
  gameGrid = generateGrid(boxX, BOX_Y);
}

function draw() {
  background(220);
  //circle(mouseX, mouseY, 100);
  orbitControl();
  //playerDisplay();
  //gameBorder();
  //sphereDisplay();
  displayGrid();
}

function keyPressed() {
  if (key === "w") {
    boxZ -= 100;
  }
  if (key === "a") {
    boxX -= 100;
  }
  if (key === "s") {
    boxZ += 100;
  }
  if (key === "d") {
    boxX += 100;
  }
}

function playerDisplay() {
  translate(boxX, BOX_Y, boxZ);
  fill("red");
  box();
}

function gameBorder() {
  push();
  translate(cylX, CYL_Y, cylZ);
  fill("orange");
  box();
  pop();
}

function sphereDisplay() {
  push();
  translate(-50, 0, -100);
  fill('red');
  sphere(50);
  pop();

  push();
  translate(0, -100, -300);
  fill('green');
  sphere(50);
  pop();

  push();
  translate(25, 25, 50);
  fill('blue');
  sphere(50);
  pop();
}

function generateGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // if (random(100) < 50) {
      //   newGrid[y].push(0);
      // }
      // else {
      //   newGrid[y].push(1);
      // }
      //newGrid[y].push(Math.floor(random(255)));
    }
  }
  return newGrid;
}

function displayGrid() {
  //let color = 0;
  let bw = 20;
  let bh = 10;
  let bd = 1;
  for (let y = 0; y < 1; y++) {
    for (let x = 0; x < 1; x++) {
      // if (gameGrid[y][x] === 0) {
      //   fill("black");
      // }
      // else if (gameGrid[y][x] === 1) {
      //   fill("white");
      // }
      //fill(random(255), random(255), random(255));
      //fill(random(255));
      // if (colorState === "red") {
      //   fill(colorState);
      //   box(boxX * cellSize, BOX_Y * cellSize, boxZ * cellSize);
      //   colorState = "green";
      // }
      // else if (colorState === "green") {
      //   fill(colorState);
      //   box(boxX * cellSize, BOX_Y * cellSize, boxZ * cellSize);
      //   colorState = "red";
      // }
      if (y === 0) {
        fill("orange");
      }
      else if (y === 1) {
        fill("green");
      }
      box(bw * cellSize, bh * cellSize, bd * cellSize);
      bw += 5;
      bh += 5;
      bd += 5;
    }
  }
}