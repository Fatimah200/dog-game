//Create variables here
var dog, dogImg, happydog;
var database;
var foodS,foodStock;

function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png");
  happydog=loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);
  
  //created dog and game image and scale.
  dog=createSprite(255,300);
  dog.addImage(dogImg);
  dog.scale=0.2;


foodStock=database.ref('Food');
foodStock.on("value",readStock);


  
}


function draw() {  
background(46, 139, 87);
  drawSprites();
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydog);
  }

textSize(20);
fill(3);
stroke("white");
text("Note: Press Up_arrow to Feed Drago Milk",250,150);


readStock();
writeStock();
}

//function to read values from DB
function readStock(data){
  foodS=data.val();
}

//function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}



