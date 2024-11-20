// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let boxX = 10;
let boxY = 10;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  debugMode();
}

function draw() {
  background(220);

  //circle(mouseX, mouseY, 100);
  orbitControl();
  box(50, 50, 50, boxX, boxY);
}

function mousePressed() {
  if (key === "w") {
    boxY += 1;
  }
  if (key === "a") {
    boxX -= 1;
  }
  if (key === "s") {
    boxY -= 1;
  }
  if (key === "d") {
    boxX += 1;
  }
}