var virusImage, playerAnimation, player, Virus, Background, BackGround, backGround, enemyGroup,pointer, pointerimage;
var gameState = "play";

var score=0;

function preload() {

  virusImage = loadImage("images/coronavirus.png");
  playerAnimation = loadAnimation("images/sprite1.png", "images/sprite2.png", 
  "images/sprite3.png", "images/sprite4.png", "images/sprite5.png", 
  "images/sprite6.png", "images/sprite7.png", "images/sprite8.png");

  pointerimage = loadImage("images/pointer.png");

  BackGround = loadImage("images/Background.jpg");


}

function setup() {
  createCanvas(600, 600);

  enemyGroup = new Group();

  Background = createSprite(300, 300, 600, 600);
  backGround = createSprite(1120, 300, 600, 600);


  player = createSprite(200, 490, 20, 20);
  player.addAnimation("animation", playerAnimation);
  player.scale = 0.5;

  pointer = createSprite(10, 10, 20, 20);
  pointer.addImage(pointerimage);
  pointer.scale = 0.2;


}

function draw() {

  if (gameState === "play") {

    Background.addImage(BackGround);
    Background.scale = 0.8;
    
    virus();
    drawSprites();

    backGround.addImage(BackGround);
    backGround.scale = 0.8;

    Background.velocityX = -2;
    backGround.velocityX = -2;

    if (Background.x < -600) {

      backGround.x = 300;
      Background.x = 1120;

    }

    if (backGround.x < -600) {

      backGround.x = 1120;
      Background.x = 300;

    }

    pointer.debug = false;

    player.setCollider("rectangle", 0, 0, player.width, player.height);

    pointer.x = World.mouseX;
    pointer.y = World.mouseY;

    if (pointer.isTouching( enemyGroup ) ) {

      enemyGroup.destroyEach();
      score=score+1;

    }

  }
  
  stroke("black");
  fill("white");
  textSize(15);
  text("score:"+score,400,30);
  
  if (player.isTouching(enemyGroup)) {

    Background.velocityX = 0;
    background("red");
    background("red");
    text("attacked by the corona",250,300);
    gameState="end";

  }
  
  if(score===20){
     
    Background.velocityX = 0;
    background("red");
    background("red");
    text("you fight against corona",250,300);
    gameState="end";
     
     }


}

function virus() {

  if (frameCount % 80 === 0) {

    var ran = Math.round(random(300, 450))
    Virus = createSprite(700, ran, 20, 20);
    Virus.addImage(virusImage);
    Virus.scale = 0.5;
    Virus.velocityX = -2;
    Virus.lifetime = 700;

    enemyGroup.add(Virus);

    pointer.depth = Virus.depth;
    pointer.depth = pointer.depth + 1;

  }

}