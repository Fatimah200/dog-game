//Create variables here
var dog,dogImg,happydog,database,foodS,foodStock;
function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png");
  happydog=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  dog=createSprite(250,300,1,1);
  dog.addImage(dogImg);
  dog.scale=0.3;

 foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
background(46, 139, 87);
drawSprites();
textSize(20);
fill(4);
stroke(white);

readStock();
writeStock();

if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydog);
  }
  
  text("Press up arrow key to feed drago milk",200,200);
}

function readStock(data){
  foodS=data.val();
}

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