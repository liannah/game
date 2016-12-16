

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth-25;
canvas.height = window.innerHeight-150;



let ants = document.getElementsByClassName("points");
const NUM_POINTS = 2;
let points = [];
let satkacikner = [];
let countDown =20;
let current_lvl = 1;
var levelchange = false;


constructAnts();
function constructAnts()
{
  for (let i = 0; i < NUM_POINTS; i++) {

      const size = 50+Math.random() * 100;
      points.push({
          x: Math.random() * (canvas.width - 2 * size),
          y: Math.random() * (canvas.height - 2 * size),
          height: size,
          width:  2*size,

          xDelta: 1, // the change that you will add to x, you can flip it when you get to the edge

          yDelta: 0, // the change that you will add to y, you can flip it when you get to the edge
          isDead: false
      });

      let item = {

          x: Math.random() * (canvas.width - 2 * size),

      };
      item.xDelta = item.width / 20;

      points.push(item);

  }
}

var leftimg = new Image();
leftimg.src = "./newant.png";

var rightimg = new Image();
rightimg.src= "./newant2.png";

var img = new Image();
img.src= "./yellow.png"

var gameOverImage = new Image();
gameOverImage.src = "./gameover.png";

var newlevel = new Image();
newlevel.src = "./levelup.png";

const draw = function () {
    //context.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach(function (l) {

        if(l.xDelta > 0) {
            context.drawImage(rightimg, l.x, l.y, l.width, l.height);
        } else  {
            context.drawImage(leftimg, l.x, l.y, l.width, l.height);
        }

        l.x += l.xDelta;
        l.y += l.yDelta;

        if (l.x + l.width >= canvas.width-10 || l.x <= 0) {
            l.xDelta *= -1;
        }
        if (l.y + l.height >= canvas.height-10 || l.y <= 0) {
            l.yDelta *= -1;
        }

    });
    drawScore();

}
const drawsatkacikner = function(){

    context.clearRect(0, 0, canvas.width, canvas.height);
    satkacikner.forEach(function (a) {
            context.drawImage(img, a.x, a.y, a.width, a.height);
    });
}

var score = 0;


$("#canvas").on('mousedown', function(e){

    const getMouseCo = function(){


        points.forEach(function(p, idx){
            var sound = new Audio('./split2.wav');
            if (e.clientX > p.x && e.clientX < p.x + p.width && e.clientY > p.y && e.clientY < p.height+p.y){
                p.isDead = true;
                p.xDelta = 0;
                p.yDelta = 0;
                satkacikner.push(p);
                points.splice(idx, 1);
                sound.play();
                score++;
                if(score >= NUM_POINTS)
                 {
                   if(current_lvl<3)
                        {
                             alert("Good job!");
                              current_lvl++; 
                              levelchange = true;    
                              next_lvl();



                        }
                        else {
                          alert("Congratulations! You win!");
                          document.location.reload();
                          //stopgame();
                        }

                }
            }

        })
    }
    getMouseCo();
});

function next_lvl()
{
	 if (levelchange) {
     context.drawImage(newlevel, 350, 200)

     }
    clearInterval(animation);
    context.clearRect(0, 0, canvas.width, canvas.height);
    countDown-=5;
    score=0;
    constructAnts(); // Fill the array with the points for the ants
    satkacikner=[];
    var animation = setInterval(animate,1);
     
     

}
function drawScore() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Score: "+score, 100, 20);
    context.fillText("Level: "+current_lvl, 100, 40);
}


$('#mosq').on('click', function(){

    leftimg.src = "./mosquito.png";
    rightimg.src = "./mosquito2.png";


})

$('#ant').on('click', function(){

    leftimg.src = "./ant.png";
    rightimg.src = "./ant2.png";

})

$('#roach').on('click', function(){

    leftimg.src = "./Cockroach.png";
    rightimg.src = "./cockroach2.png";

})


let animate = function () {

    drawsatkacikner();
    draw();
    //  requestAnimationFrame(animate);
}
var animation = setInterval(animate,1);
//animate();

let sTime = new Date().getTime();



function UpdateTime() {
    let cTime = new Date().getTime();
    let diff = cTime - sTime;
    let seconds = countDown - Math.floor(diff / 1000);
    if (seconds >= 0) {
        let minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        $("#minutes").text(minutes < 10 ? "0" + minutes : minutes);
        $("#seconds").text(seconds < 10 ? "0" + seconds : seconds);
    }
     else {
       $("#countdown").hide();
       gameOver();
       clearInterval(counter);
    }
}
UpdateTime();
var counter = setInterval(UpdateTime, 1000);



function gameOver()
{
  satkacikner=[];
  points=[];
  context.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(gameOver);
  //context.drawImage(gameOverImage, 350, 100);
  context.drawImage(gameOverImage, 350,100);

}


