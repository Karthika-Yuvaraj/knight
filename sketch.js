var bg, backgroundImg;
var knight, standing_knight, running_knight, fallen_knight;
var invisibleGround;
var gameState, start, play, end;
var STARTImg, resetImg, START, reset;
var ghost1Img, ghost2Img, ghost3Img, ghostGroup;
gameState = "start"

function preload() {
  backgroundImg = loadImage("backgroundImg.avif");
  standing_knightImg = loadImage("standing_knight.png");
  running_knight = loadImage("running_knight1.gif");
  fallen_knightImg = loadImage("fallen_knight.png");
  STARTImg = loadImage("startImg.png");
  resetImg = loadImage("restartImg.png");
  ghost1Img = loadImage("g.png");
  ghost2Img = loadImage("ghost2.png");
  ghost3Img = loadImage("ghost3.png");
}

function setup() {
  createCanvas(2000, 500);

  bg = createSprite(500, 100);
  bg.addImage("backgroundImg", backgroundImg);
  bg.velocityX = -3;

  invisibleGround = createSprite(200, 480, 400, 20);
  invisibleGround.visible = false;

  START = createSprite(680, 370, 10, 20);
  START.addImage("STARTImg", STARTImg);
  START.scale = 0.3;

  

  knight = createSprite(150, 40);
  knight.addAnimation("running", running_knight);
  knight.scale = 0.5;
  knight.collide(invisibleGround);
//  standing_knight = createSprite(150, 400);
  knight.addImage("standing_knightImg", standing_knightImg);
 // standing_knight.scale = 0.3;

ghost1Img.debug=true
ghost2Img.debug=true
ghost3Img.debug=true

  // Create the ghost group
  ghostGroup = new Group();
}

function draw() {
  console.log(gameState)


   //START.visible = false;

 START.visible=false



    
if (bg.x < 0) {
    bg.x = 400;
  }
    if (keyDown("space") && knight.y >= 50) {
      knight.velocityY = -17;
    }

    knight.velocityY += 0.8;

    knight.collide(invisibleGround);

    // Spawn ghosts at regular intervals
    if (frameCount % 100 === 0) {
      spawnGhosts();
      console.log("working")
    }

    // Check for collision with ghosts
    if (ghostGroup.isTouching(knight)) {
    bg.velocityX = 0;
    knight.velocityX = 0;
    knight.velocityY = 0;
    ghostGroup.setVelocityXEach(0);
    ghostGroup.setVelocityYEach(0);

    // Show the restart button
    reset.visible = true;

    // Display the game over text
    textSize(50);
    fill("red");
    text("Game Over", 600, 300);

    // Check for restart
    if (mousePressedOver(reset)) {
      restartGame();
    }

    }



   

  drawSprites();
}

// Function to spawn ghosts
function spawnGhosts() {
  var ghost = createSprite(2000, random(50, 500));
  var rand = Math.round(random(1, 3));
  switch (rand) {
    case 1:
      ghost.addImage(ghost1Img);
      break;
    case 2:
      ghost.addImage(ghost2Img);
      break;
    case 3:
      ghost.addImage(ghost3Img);
      break;
    default:
      break;
  }
  ghost.scale = 0.3;
  ghost.velocityX = -5;
  ghostGroup.add(ghost);
}

// Function to restart the game
function restartGame() {
  gameState = "start";
  START.visible = true;
  reset.visible = false;
  knight.x = 150;
  knight.y = 700;
  bg.velocityX = -3;
  ghostGroup.destroyEach();
}
