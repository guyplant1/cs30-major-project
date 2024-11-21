// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let boxX = 10;
const BOX_Y = 0;
let boxZ = 10;
let cylX = 100;
const CYL_Y = 0;
let cylZ = 100;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  debugMode();
}

function draw() {
  background(220);

  //circle(mouseX, mouseY, 100);
  orbitControl();
  playerDisplay();
  gameBorder();
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
  translate(cylX, CYL_Y, cylZ);
  fill("orange");
  box();
}