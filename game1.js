let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const NUM_POINTS = 20; 
const points = [];

const size = Math.random() * 100;

for(let i = 0; i < NUM_POINTS; i++) {
  points.push({
    x: Math.random() * (canvas.width-2*size),
    y: Math.random() * (canvas.height-2*size),
    width: 2*size,
    height: size,
    xDelta: 1,
    yDelta: 1,    
  });
}
const draw = function() {
 context.clearRect(0,0,canvas.width,canvas.height); 
 points.forEach(function(l){
    var img = new Image();
    img.src = "./ant.png";
    img.onload = function() {
        context.drawImage(img, l.x, l.y, l.width, l.height);
    };
  l.x+=l.xDelta;
  l.y+=l.yDelta;
  if(l.x+l.width>=canvas.width||l.x<=0){
    l.xDelta*=-1;
    

  }
  if(l.y+l.height>=canvas.height||l.y<=0){
    l.yDelta*=-1;
  }
  
 });
}; 

let animate = function() {
    draw();
    setTimeout(animate, 1);
};
animate();







