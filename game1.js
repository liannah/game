let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



const NUM_POINTS = 20; 
const points = [];

var image1=document.getElementById("mypictureID");
var image2=document.getElementById("mypictureID2");
const size = Math.random() * 0.01;

for(let i = 0; i < NUM_POINTS; i++) {
  points.push({
    x: Math.random() * (canvas.width-2*size),
    y: Math.random() * (canvas.height-2*size),
    width: size,
    height: size,
    xDelta: 0.9,
    yDelta: 1,
    image: image1,  //set the starting image     
  });
}
const draw = function()
{
  context.clearRect(0,0,canvas.width,canvas.height);

  for (let i=0;i<NUM_POINTS;i++)
  {
    point=points[i];
   
    context.drawImage(point.image,point.x,point.y); //Draw the image from points array

    point.x+=point.xDelta;
    point.y+=point.yDelta;

    if(point.x<=0 ||point.x>=canvas.width-point.width)
    {
      point.xDelta*=-1;
      
          if(point.image==image1)point.image=image2; //Switch the images when hitting edge
          else
              point.image=image1;
    }

    if(point.y<=0 ||point.y>=canvas.height-point.height)
    {
      point.yDelta*=-1;
      
        if(point.image==image1)point.image=image2; //Switch the images when hitting edge
        else
          point.image=image1;
    }
  }

};

let animate = function() {
    draw();
    setTimeout(animate, 1);
};
animate();







