// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global
 *    createCanvas, background, width, height,
 *    colorMode, HSB
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,
 *    keyIsPressed, keyCode, loadImage, image, line,
 *    fill, rect
 */

let g1, mario, xDirection, yDirection;

function setup() {
  // Code here runs only once
  createCanvas(400, 300);

  g1 = new Goomba();
  mario = new Mario();
  xDirection = null;
  yDirection = null;
  // l1 = new Level1();
}

function draw() {
  // Code here runs continuously
  background(220);
  line(0, 250, 400, 250); //ground line

  g1.move();
  g1.display();

  mario.updateGravity();
  mario.move();
  mario.display();

  // l1.display()
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    xDirection = "W";
  } else if (keyCode === RIGHT_ARROW) {
    xDirection = "E";
  } else if (keyCode === UP_ARROW) {
    yDirection = "N";
  }
}

class Mario {
  constructor() {
    this.x = 100;
    this.y = 200;
    this.speed = 1;
    this.gravity = 0.6;
    this.jump = -15;
    this.velocityY = 0;
    this.image = loadImage("https://i.imgur.com/4NbQZAp.png");
  }

  move() {
    if (keyIsPressed) {
      if (xDirection == "W") {
        this.x -= this.speed;
      } else if (xDirection == "E") {
        this.x += this.speed;
      } 
      if (yDirection == "N") {
        this.doJump();
      }
    }
  }

  doJump() {
      this.y += this.jump;
      yDirection = null;
  }

  display() {
    image(this.image, this.x, this.y, 50, 50);
  }

  updateGravity() {
    if (this.y < 200) {
      this.velocityY += this.gravity;
      this.velocityY *= 0.9;
      this.y += this.velocityY;
    }
    if (this.y < 15) {
      this.y = 15;
    }

  }
}

// class Monster {
//   constructor(x, y, speed) {
//     this.x = x
//     this.y = y
//     this.speed = speed
//   }
//   move() {}
//   display() {}
// }




