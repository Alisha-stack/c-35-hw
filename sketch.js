var balloon;
var bgImg;
var bImg;
var hypnoticBalloon, database;
var position;

function preload(){
bgImg=loadImage("Hot Air Ballon-01.png");
 bImg=loadImage("Hot Air Ballon-02.png");
}


function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(800,500);



 
 hypnoticBalloon = createSprite(100,400,10,10);
 hypnoticBalloon.addImage(bImg);
 hypnoticBalloon.scale=0.4;

 var hypnoticBalloonPosition = database.ref('balloon/position');
 hypnoticBalloonPosition.on("value", readPosition, showError);

}

function draw() {
  background(bgImg);
  textSize(15)  
  text(" **Use Arrow keys to move Hot Air Balloon!",40,50);

  if(position!==undefined)if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
  }
  drawSprites();
}


function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBalloon.x = position.x;
  hypnoticBalloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}