//creating variables
var ground,groundImage,Iground ;
var ceiling ;
var block,blockImage,blockGroup,Iblock,IblockGroup;
var block1,blockGroup1,Iblock1,IblockGroup1;
var block2,blockGroup2,Iblock2,IblockGroup2;
var block3,blockGroup3,Iblock3,IblockGroup3;
var IblockUp,IblockUpGroup;
var IblockUp1,IblockUpGroup1;
var IblockUp2,IblockUpGroup2;
var IblockUp3,IblockUpGroup3;
var warrior,warriorImage1,warriorImage2,warriorImage3,warriorImage4;
var run = 1 ;
var jumpUp = 2 ;
var jumpDown = 3 ;
var warriorState = run ;
var skeleton,skeletonImage,skelGroup;
var bat,batImage,batGroup;
var r0 = 200 ;
var NULL = 1;
var PLAY = 2;
var OVER = 0;
var gameState = NULL ;
var BG,BGImage;
var instructions,instructionsImage;
var gameOver,gameOverImage ;
var restart,restartImage ;
var y = 80 ;
var score = 0 ;
var jumpSound ;
var BGsound ;

function preload(){

  //loading images
  groundImage = loadImage("ground.png");
  blockImage  =loadImage("block.png");
  warriorImage1 = loadAnimation("R-1.png","R-2.png","R-3.png","R-4.png","R-5.png","R-6.png");
  warriorImage2 = loadAnimation("J-1.png");
  warriorImage3 = loadAnimation("J-2.png");
  skeletonImage = loadAnimation("Skel1.png","Skel2.png","Skel3.png");
  batImage = loadAnimation("E-1.png","E-2.png","E-3.png","E-4.png");
  BGImage  = loadImage("BG.png");
  gameOverImage = loadImage("gameOver.png");
  instructionsImage = loadImage("instructions.png");
  restartImage = loadImage("restart.png");
  
  //loading sounds
  jumpSound = loadSound("jump.mp3");
  destroySound = loadSound("destroy.mp3");
  BGsound = loadSound("BG.mp3");
  
}

function setup() {
  
  createCanvas(1518,694);

  //playing background sound 
  BGsound.play();
  BGsound.setLoop(true);
  
  //creating sprites 
  ground = createSprite(759,650,10,10);
  ground.addImage("ground",groundImage);
  ground.scale = 4 ;
  
  Iground = createSprite(759,645,1518,50);  
  Iground.visible = false ;

  other = createSprite(windowWidth,windowHeight,1518,50);  
  //other.visible = false ;
  
  ceiling = createSprite(759,20,10,10);
  ceiling.addImage("ground",groundImage);
  ceiling.scale = 4 ;
  ceiling.mirrorY(-1);
  
  warrior = createSprite(350,610,10,10);
  warrior.addAnimation("runing",warriorImage1);
  warrior.addAnimation("jumpingUp",warriorImage2);
  warrior.addAnimation("jumpingDown",warriorImage3);
  warrior.scale = 1.2 ;
  warrior.visible = false ;
  
  BG = createSprite(900,300,10,10);
  BG.addImage("bG",BGImage);
  
  instructions = createSprite(300,370,10,10);
  instructions.addImage("ins",instructionsImage);
  
  gameOver = createSprite(759,300,10,10);
  gameOver.addImage("over",gameOverImage);
  gameOver.scale = 0.5 ;
  gameOver.visible = false;
  
  restart = createSprite(759,400,10,10);
  restart.addImage("restart",restartImage);
  restart.scale = 0.5 ;
  restart.visible = false;
  
  playButton = createButton("PLAY");
  playButton.position(300,520);
  playButton.style('background-color',color(50,250,200,255))
  playButton.mousePressed(clickToPlay);
  playButton.size(150); 
  
  //creating groups
  blockGroup = new Group();
  IblockGroup = new Group();
  IblockUpGroup = new Group();
  
  blockGroup1 = new Group();
  IblockGroup1 = new Group();
  IblockUpGroup1 = new Group();
  
  blockGroup2 = new Group();
  IblockGroup2 = new Group();
  IblockUpGroup2 = new Group();
  
  blockGroup3 = new Group();
  IblockGroup3 = new Group();
  IblockUpGroup3 = new Group();
  
  skelGroup = new Group();
  batGroup = new Group();

  camera.position.x = 1518/2 ; 
  camera.position.y = 694/2 ;  
  
}

function draw() {
  
  background(0);
  warrior.x = camera.position.x - 409 ;
  Iground.x = camera.position.x ;

  gameOver.x = camera.position.x ;
  restart.x  = camera.position.x  ;
 
  BG.x =camera.position.x + 141 ;
  instructions.x = camera.position.x - 459;

  //removing extra instructions 
  if(frameCount> 100){
    y = 5000 ; 
  }
  
  //gameState play
  
  
  if(gameState === PLAY){

    camera.position.x +=5 ;
    
  //scoring system 
   score +=1 ;

  //creating infinite ground and ceiling
  ground.setVelocity(0,0);
  ceiling.setVelocity(0,0);
  
  if(ground.x< camera.position.x - 150){
    
    ground.x = camera.position.x;
    ceiling.x = camera.position.x;
     
  }  
  
  //extra condition to keep the warrior run on blocks
  
  if(warrior.isTouching(Iground)||warrior.isTouching(IblockGroup)||warrior.isTouching(IblockGroup1)||warrior.isTouching(IblockGroup2)||warrior.isTouching(IblockGroup3)){
    
    warriorState = run ;
    warrior.changeAnimation("runing",warriorImage1);
  }
  
  //providing gravity
  warrior.velocityY += 0.9 ;
  
  //collide and bounce statements
  warrior.collide(ground);
  warrior.bounceOff(ceiling);
  warrior.collide(blockGroup);
  warrior.collide(blockGroup1);
  warrior.collide(blockGroup2);
  warrior.collide(blockGroup3);
  
  skelGroup.bounceOff(blockGroup);
  skelGroup.bounceOff(blockGroup1);
  skelGroup.bounceOff(blockGroup2);
  skelGroup.bounceOff(blockGroup3);
  skelGroup.collide(ground);
  
  batGroup.bounceOff(ground);
  batGroup.bounceOff(ceiling);
  batGroup.bounceOff(skelGroup);
  batGroup.bounceOff(blockGroup);
  batGroup.bounceOff(blockGroup1);
  batGroup.bounceOff(blockGroup2);
  batGroup.bounceOff(blockGroup3);
    
  //gravity for skeleton
  skelGroup.setVelocityYEach(4);
  
  //increasing game difficulty
  if(frameCount > 10000 ){
    r0 = 50 ;
    skelGroup.setVelocityXEach(-12);
  }
  
  // changing player animation to jump up and down
  
 if(warrior.velocityY > 0 && warriorState === jumpDown){
    warrior.changeAnimation("jumpingDown",warriorImage3);
  } 
    
 if(warrior.velocityY < 0&& warriorState === jumpUp ){
    warrior.changeAnimation("jumpingUp",warriorImage2);
    warriorState = jumpDown ;
  } 
  
 //making the player jump
 if(keyDown("space") && warrior.isTouching(Iground)||warrior.isTouching(IblockGroup)&&warriorState === run){
     warrior.velocityY = -20 ;
     warrior.velocityX = 0 ;
     warrior.x = 350 ;
     warriorState  =jumpUp;
     jumpSound.play();
     
  }
  
  if(keyDown("space") && warrior.isTouching(Iground)||warrior.isTouching(IblockGroup1)&&warriorState === run){
     warrior.velocityY = -20 ;
     warrior.velocityX = 0 ;
     warrior.x = 350 ;
     warriorState  =jumpUp;
     jumpSound.play();
  }
  
  if(keyDown("space") && warrior.isTouching(Iground)||warrior.isTouching(IblockGroup2)&&warriorState === run){
     warrior.velocityY = -20 ;
     warrior.velocityX = 0 ;
     warrior.x = 350 ;
     warriorState  =jumpUp;
     jumpSound.play();
  }
  
  if(keyDown("space") && warrior.isTouching(Iground)||warrior.isTouching(IblockGroup3)&&warriorState === run){
     warrior.velocityY = -20 ;
     warrior.velocityX = 0 ;
     warrior.x = 350 ;
     warriorState  =jumpUp;
     jumpSound.play();
  }
  
 if(keyDown("space")&&(warrior.isTouching(IblockUpGroup)||warrior.isTouching(IblockUpGroup1)||warrior.isTouching(IblockUpGroup2)||warrior.isTouching(IblockUpGroup3))&&warriorState === run){
     warrior.velocityY = -20 ;
     warrior.velocityX = 0 ;
     warrior.x = 350 ;
     warriorState  =jumpUp;
     jumpSound.play();
  }
 
  
  
  //calling function for block,skeleton,bat and stairs
  createBlock();
  createStairs();
  createSkeleton();
  createBat();
    
  //changigng gameState
  if(warrior.visible ===true && warrior.isTouching(skelGroup)&& warrior.isTouching(Iground)&& warrior.velocityY>0){
     skelGroup.destroyEach();
     batGroup.destroyEach();
     gameState = OVER ;
     destroySound.play();
  }
  else if(warrior.velocityY > 0 && warriorState === jumpDown&& warrior.isTouching(skelGroup)){
    
    skelGroup.destroyEach();
    destroySound.play();
  }
  
  if(warrior.visible ===true && warrior.isTouching(batGroup)){
     batGroup.destroyEach();
     skelGroup.destroyEach();
     gameState = OVER ;
     destroySound.play();
  }
    
 }

  //gameState over
  if(gameState === OVER){
    
     gameOver.visible = true ;
     restart.visible  = true ; 
     warrior.collide(ground);
     warrior.collide(ceiling);
     blockGroup.destroyEach();
     blockGroup1.destroyEach();
     blockGroup2.destroyEach();
     blockGroup3.destroyEach();
     IblockGroup.destroyEach();
     IblockGroup1.destroyEach();
     IblockGroup2.destroyEach();
     IblockGroup3.destroyEach();
     IblockUpGroup.destroyEach();
     IblockUpGroup1.destroyEach();
     IblockUpGroup2.destroyEach();
     IblockUpGroup3.destroyEach();
    
    if(mousePressedOver(restart)&& restart.visible === true){
       reset();
    }
    
  }
  
  drawSprites();

  fill("orange");
  textSize(20);
  text("YOU CAN DESTROY THE SKELETON BY HITTING THEIR SKULLS BY JUMPING ", camera.position.x-709,y);
  
  fill("white");
  textSize(30);
  text("SCORE: " + round(score/10),camera.position.x+541,80);
}

//creating block
function createBlock(){
  
  var rand1 = round(random(120,180));
  if(frameCount%rand1 === 0){
    block  =createSprite(camera.position.x + 766,597,10,10);
    block.addImage("block",blockImage);
    block.scale = 4 ;  
    block.velocityX = ground.velocityX ;
    
    Iblock = createSprite(camera.position.x + 759,597,85,45);
    Iblock.velocityX = block.velocityX ;
    Iblock.visible = false ;
    
    IblockUp = createSprite(camera.position.x + 759,570,80,10);
    IblockUp.velocityX = block.velocityX + 0.05;
    IblockUp.visible = false ;
    
    block.lifetime  = 325 ;
    Iblock.lifetime  = 325 ;
    IblockUp.lifetime  = 325 ;
    
    blockGroup.add(block);
    IblockGroup.add(Iblock);
    IblockUpGroup.add(IblockUp);
    
  }
  
}

//creating stairs
function createStairs(){
  
  if(frameCount % 500 === 0){
    block1  =createSprite(camera.position.x + 759,597,10,10);
    block1.addImage("block",blockImage);
    block1.scale = 4 ;  
    block1.velocityX = ground.velocityX ;
    
    Iblock1 = createSprite(camera.position.x + 759,597,85,45);
    Iblock1.velocityX = block.velocityX ;
    Iblock1.visible = false ;
    
    IblockUp1 = createSprite(camera.position.x + 759,570,80,10);
    IblockUp1.velocityX = block.velocityX + 0.05;
    IblockUp1.visible = false ;
    
    block1.lifetime  = 325 ;
    Iblock1.lifetime  = 325 ;
    IblockUp1.lifetime  = 325 ;
    
    blockGroup1.add(block1);
    IblockGroup1.add(Iblock1);
    IblockUpGroup1.add(IblockUp1);
    
    block2  =createSprite(camera.position.x + 829,550,10,10);
    block2.addImage("block",blockImage);
    block2.scale = 4 ;  
    block2.velocityX = ground.velocityX ;
    
    Iblock2 = createSprite(camera.position.x + 829,550,85,45);
    Iblock2.velocityX = block.velocityX ;
    Iblock2.visible = false ;
    
    IblockUp2 = createSprite(camera.position.x + 829,523,80,10);
    IblockUp2.velocityX = block.velocityX + 0.05;
    IblockUp2.visible = false ;
    
    block2.lifetime  = 325 ;
    Iblock2.lifetime  = 325 ;
    IblockUp2.lifetime  = 325 ;
    
    blockGroup2.add(block2);
    IblockGroup2.add(Iblock2);
    IblockUpGroup2.add(IblockUp2);
    
    block3  =createSprite(camera.position.x + 881,500,10,10);
    block3.addImage("block",blockImage);
    block3.scale = 4 ;  
    block3.velocityX = ground.velocityX ;
    
    Iblock3 = createSprite(camera.position.x + 881,500,85,45);
    Iblock3.velocityX = block.velocityX ;
    Iblock3.visible = false ;
    
    IblockUp3 = createSprite(camera.position.x + 881,473,80,10);
    IblockUp3.velocityX = block.velocityX + 0.05;
    IblockUp3.visible = false ;
    
    block3.lifetime  = 325 ;
    Iblock3.lifetime  = 325 ;
    IblockUp3.lifetime  = 325 ;
    
    blockGroup3.add(block3);
    IblockGroup3.add(Iblock3);
    IblockUpGroup3.add(IblockUp3);
    
    
  }
}

//creating skeleton
function createSkeleton(){
  
  var r ;
  var a  = round(random(1,4));
  
  switch(a){
      case 1 : r = r0;
      break;
      case 2:  r = r0+ 100;
      break;
      case 3:  r = r0+ 200;
  }
  
  if(frameCount% r ===0){
  skeleton = createSprite(camera.position.x + 766,580,10,10);
  skeleton.addAnimation("skel",skeletonImage);
  skeleton.setVelocity(-2,0);
  skeleton.scale = 2 ;
  skeleton.lifetime = 700;
  skeleton.velocityY += 1 ;
  skelGroup.add(skeleton);
    
  } 
}

//creating bat 
function createBat(){
  
  var r1 ;
  var a1  = round(random(1,4));
  
  switch(a1){
      case 1 : r1 = 400;
      break;
      case 2:  r1 = 700;
      break;
      case 3:  r1 = 750;
  }
  
  if(frameCount% r1 ===0){
  bat = createSprite(camera.position.x + 766,80,10,10);
  bat.addAnimation("bat",batImage);
  bat.setVelocity(-2,5);
  bat.scale = 1.4 ;
  bat.mirrorX(-1);
  bat.lifetime = 700;
  batGroup.add(bat);
    
  } 
}

//reset function
function reset(){
  
  gameState = NULL;
  gameOver.visible = false ;
  restart.visible =  false ;
  instructions.visible = true ;
  BG.visible = true ;
  warrior.y = 550 ;
  warrior.collide(ground);
  warrior.velocityY = 0; 
  score = 0 ;
  playButton.show();
}
function clickToPlay(){

  //changing gameState
  if(BG.visible ===true&& gameState === NULL){
    
    BG.visible = false ;
    instructions.visible = false ;
    warrior.visible = true ;
    gameState = PLAY ;
    playButton.hide();
  }
}