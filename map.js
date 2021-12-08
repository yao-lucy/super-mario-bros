// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global
 *    createCanvas, background
 *    colorMode, HSB
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 
 *    keyPressed, loadImage, image, 
 *    fill, rect, noStroke
 *    keyIsPressed, keyCode,
 *    text, textSize, textStyle, BOLD,
 */

let width, height, l1, offset, gameIsOver, gameIsWon;
let g1, mario, xDirection, yDirection, jumpTimer, blockLength;

function setup() {
  // width = l1.map[0].length * l1.bL
  // height = l1.map.length * l1.bL
  width = 400
  height = 300
  createCanvas(width, height)
  colorMode(HSB, 360, 100, 100)
  offset = 0
  blockLength = null;
  gameIsOver = false;
  gameIsWon = false;
  
  l1 = new Level1(height);
  
  g1 = new Goomba(blockLength, l1);
  
  xDirection = null;
  yDirection = null;
  jumpTimer = 0;
  
  
  mario = new Mario(blockLength, l1, height);
}

function draw() {
  background(100)

  l1.display()
  mario.display();
  g1.display();
  
  // console.log (l1.map[0].length)

  if (gameIsOver == false && gameIsWon == false){
  mario.updateGravity();
  mario.move();
  mario.checkFalling();
  mario.checkBlockAbove();
  mario.checkCoinBlock();
  
  g1.move();
  g1.checkCollision(mario.rowMarioOn(), mario.colMarioOn());
    
    mario.checkWin();
  } 
  
  if (gameIsOver == true){
    gameOver();
  }
  
  else if (gameIsWon == true) {
    gameWon();
  }
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

function gameOver(){
  fill(100);
  textSize(15);
  textStyle(BOLD);
  text("Game Over", width / 2 - 30, height / 2);
}

function gameWon(){
  fill(100);
  textSize(15);
  textStyle(BOLD);
  text("You win!", width / 2 - 30, height / 2);
}

class Level1 {
  constructor(canvasHeight) {
    this.map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 6, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 2, 6, 2, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 2, 6, 0, 0, 0, 0, 6, 0, 0, 6, 0, 0, 6, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
 
    /*
    0: sky
    1: ground block
    2: brick block
    3: question block
    4: hard block
    5: power up block - question block
    6: singular coin block - question block
    7: star block - brick block
    8: one up block - hidden
    9: multiple coins block - brick block
    */
    
    this.bL = canvasHeight / this.map.length
    blockLength = this.bL
    
    this.groundBlockTexture = loadImage("https://i.imgur.com/ll71VaZ.png") // can't find official texture
    this.brickBlockTexture = loadImage("https://i.imgur.com/Ze4b4ai.png")
    this.questionBlockTexture = loadImage("https://i.imgur.com/9i8tuTD.png")
    this.hardBlockTexture = loadImage("https://i.imgur.com/gEaHCC6.png")
    this.emptyBlockTexture = loadImage("https://i.imgur.com/M6hqkgx.png")
    
    this.superMushroomTexture = loadImage("https://i.imgur.com/ig9usMG.png")
    this.oneUpMushroomTexture = loadImage("https://i.imgur.com/5oaB1nD.png")
    this.starTexture = loadImage("https://i.imgur.com/xfb02ec.png")
    this.coinTexture = loadImage("https://i.imgur.com/VzFBCPg.png")
  }
  
  display() {
    noStroke();
    let tempMap = this.map
    for (let i = 0; i < tempMap.length; i++) {
      for (let j = 0; j < tempMap[i].length; j++) {
        let drawXHere = j*this.bL-offset;
        let drawYHere = i*this.bL;
        if (tempMap[i][j] == 0) { // sky
          fill(219, 63, 99)
          rect(drawXHere, drawYHere, this.bL, this.bL)
        }
        else if (tempMap[i][j] == 1) { // ground
          image(this.groundBlockTexture, drawXHere, drawYHere, this.bL, this.bL)
        }
        else if (tempMap[i][j] == 2 || tempMap[i][j] == 7 || tempMap[i][j] == 9) { // brick block with hidden coin or star
          image(this.brickBlockTexture, drawXHere, drawYHere, this.bL, this.bL)
        } 
        else if (tempMap[i][j] == 5 || tempMap[i][j] == 6) { // power or coin block
          image(this.questionBlockTexture, drawXHere, drawYHere, this.bL, this.bL)
        } 
        else if (tempMap[i][j] == 4) { // hard block
          image(this.hardBlockTexture, drawXHere, drawYHere, this.bL, this.bL)
        }
      }
    }
    for (let i = 0; i < tempMap.length; i++) {
      for (let j = 0; j < tempMap[i].length; j++) {
        let drawXHere = j*this.bL-offset;
        let drawYHere = i*this.bL;
        if (tempMap[i][j] == 5) { // power up mushroom
          image(this.superMushroomTexture, drawXHere, drawYHere, this.bL, this.bL)
        }
        if (tempMap[i][j] == 6 || tempMap[i][j] == 9) { // coin
          image(this.coinTexture, drawXHere, drawYHere, this.bL, this.bL)
        }
        if (tempMap[i][j] == 7) { // star power up
          image(this.starTexture, drawXHere, drawYHere, this.bL, this.bL)
        }
        if (tempMap[i][j] == 8) { // one up mushroom
          image(this.oneUpMushroomTexture, drawXHere, drawYHere, this.bL, this.bL)
        }
      }
    }
  }
  // isBlock(row, col) {
  //   return (this.map[row][col] != 0);
  // }
}


class Mario {
  constructor(bL, level, canvasHeight) {
    this.blockHeight = bL;
    this.x = 50;
    this.y = this.blockHeight*5;
    this.speed = 3;
    this.gravity = 0.6;
    this.jump = -15;
    this.velocityY = 0;
    this.image = loadImage("https://i.imgur.com/4NbQZAp.png");
    this.levelMap = level.map;
    this.canvasHeight = canvasHeight;
    this.closestSolidBlockBelow = 8;
    this.closestSolidBlockAbove = 0;
    this.numCoins = 0;
    
  }

  move() {
    if (keyIsPressed) {
      if (xDirection == "W") {
        if (offset >= 0){
        offset -= this.speed
        }
      } else if (xDirection == "E") {
        offset += this.speed
      } 
      if (yDirection == "N") {
        this.doJump();
      }
    }
  }

  doJump() {
    if (jumpTimer <= 8) {
      this.y += this.jump;
      jumpTimer++;
    } else {
      yDirection = null;
    }
    
    
  }

  display() {
    image(this.image, this.x, this.y, this.blockHeight, this.blockHeight);
    fill(255);
    text('Coins: ' + this.numCoins, 5, 15)
  }

  updateGravity() {
    
    if (this.y < this.blockHeight*this.closestSolidBlockBelow) {
      this.velocityY += this.gravity;
      this.velocityY *= 0.9;
      this.y += this.velocityY;
    } 
    if (this.y >= this.closestSolidBlockBelow*this.blockHeight) {
      jumpTimer = 0;
    }
    if (this.y < this.blockHeight*(this.closestSolidBlockAbove+1)) {
      console.log("test test test")
      this.velocityY = 0;
      this.velocityY += this.gravity;
      this.velocityY *= 0.9;
      this.y += this.velocityY;
      jumpTimer=9;
    }

  }
  
  rowMarioOn() {
    let playerRow = null;
    for (let i = 0; i < this.levelMap.length-1; i++) {
      if ((this.y > i*this.blockHeight) && (this.y <= (i+1) * this.blockHeight)) {
        playerRow = i;
      }
    }
    if (playerRow == 13) {
      gameIsOver = true
    }
    return playerRow;
  }
  
  colMarioOn() {
    let playerCol = null;
    for (let i = 0; i < this.levelMap[0].length; i++) {
      if ((this.x+offset> i* this.blockHeight-this.blockHeight/2) && (this.x+offset<= (i+1) * this.blockHeight-this.blockHeight/2)) {
        playerCol = i;
      }
    }
    return playerCol;
  }
  
  checkFalling() {
    if ((this.levelMap[this.rowMarioOn()+1][this.colMarioOn()] != 0))  {
      this.closestSolidBlockBelow = this.rowMarioOn();
    }
    else {
      this.closestSolidBlockBelow = 20
    }
  }

  
  checkBlockAbove(){
    if ((this.levelMap[this.rowMarioOn() - 1][this.colMarioOn()] != 0)){
      this.closestSolidBlockAbove = this.rowMarioOn()-1;
    } else if ((this.levelMap[this.rowMarioOn()][this.colMarioOn()] != 0)){
      this.closestSolidBlockAbove = this.rowMarioOn();
    } else {
      this.closestSolidBlockAbove = 0;
    }
  }
  
  checkCoinBlock() {
    if (this.levelMap[this.closestSolidBlockAbove][this.colMarioOn()] == 6){
        this.numCoins++;
        this.levelMap[this.closestSolidBlockAbove][this.colMarioOn()] = 4
      }
  }
  
  checkWin() {
    if (this.colMarioOn() == 155) {
      gameIsWon = true;
    }
  }
}

class Goomba {
  constructor(bL, level) {
    this.gx = 100;
    
    this.mapX = 100;
    // this.screenX = this.mapX-offset;
    this.y = blockLength*12;
    this.speed = 1;
    this.image = loadImage("https://i.imgur.com/0L0a1xm.png");
    this.levelMap = level.map;
    this.blockHeight = bL;
    this.hit = false;
  }
    move() {
    if (this.hit == false) {
      this.mapX += this.speed;
      let goombaColNum = this.colGoombaOn();
      if (goombaColNum > 11) {
        this.speed *= -1;
      }
      if (goombaColNum < 5) {
        this.speed *= -1;
      }
    }
  }
  display() {
    let screenX = this.mapX-offset;
    image(this.image, screenX, this.y, blockLength, blockLength);
  }
  
   rowGoombaOn() {
    let goombaRow = null;
    for (let i = 0; i < this.levelMap.length - 1; i++) {
      if ((this.y> i* this.blockHeight) && (this.y<= (i+1) * this.blockHeight)) {
        goombaRow = i;
      }
    }
    return goombaRow + 1; //this is + 1 because for some reason, goomba thinks it is on row 11, not 12
  }
  
  colGoombaOn() {
    let goombaCol = null;
    for (let i = 0; i < this.levelMap[0].length; i++) {
      if ((this.mapX> i* this.blockHeight) && (this.mapX<= (i+1) * this.blockHeight)) {
        goombaCol = i;
      }
    }
    return goombaCol;
  }
  
  checkCollision(marioRow, marioCol){
    if (this.rowGoombaOn() == marioRow && this.colGoombaOn() == marioCol){
      this.hit = true;
      gameIsOver = true; //if you hit goomba, game over???
    }
  }
  
  // checkFallDeath() {
  //   if (this.y >= this.blockHeight*(this.map.length-1)) {
  //     gameIsOver = true;
  //   }
  // }
  
}