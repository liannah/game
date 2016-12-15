let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const NUM_POINTS = 20;//20 + Math.random();
const points = [];
let ants = document.getElementsByClassName("points");

for (let i = 0; i < NUM_POINTS; i++) {

    const size = 50+Math.random() * 100;
    points.push({
       
        x: Math.random() * (canvas.width - 2 * size),
        y: Math.random() * (canvas.height - 2 * size),
        height: size,
        width:  2*size,

        xDelta: 1, // the change that you will add to x, you can flip it when you get to the edge

        yDelta: 1, // the change that you will add to y, you can flip it when you get to the edge
        isDead: false

    });

}

var leftimg = new Image();
leftimg.src = "./ant.png";

var rightimg = new Image();
rightimg.src= "./ant2.png";

var img = new Image();
img.src= "./yellow.png"

const draw = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach(function (l) {
        

        if(l.isDead) { context.drawImage(img, l.x, l.y, l.width, l.height);

        } else if(l.xDelta > 0) {
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
let animate = function () {
    draw();
    requestAnimationFrame(animate);
}

animate();


$("#canvas").on('mousedown', function(e){

    const getMouseCo =function(){

    points.forEach(function(p) {
       var sound = new Audio('./split2.wav');

        if (e.clientX > p.x && e.clientX < p.x + p.width && e.clientY > p.y && e.clientY < p.height+p.y){
            p.isDead = true;
            p.xDelta = 0;
            p.yDelta = 0;
            sound.play();
}

        }
    )
}


    getMouseCo();
});

var score = 0;

$("#canvas").on('mousedown', function(e){
function detectionofclick() {

points.forEach(function(p){
        if (e.clientX > p.x && e.clientX < p.x + p.width && e.clientY > p.y && e.clientY < p.height+p.y) { 
            score++; 
         if(score > NUM_POINTS) {
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
        }

    }

})
}
detectionofclick();

});

function drawScore() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Score: "+score, 100, 20);
}



let sTime = new Date().getTime();
let countDown =10;


function UpdateTime() {
    let cTime = new Date().getTime();
    let diff = cTime - sTime;
    let seconds = countDown - Math.floor(diff / 1000);
    if (seconds >= 0) {
        let minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        $("#minutes").text(minutes < 10 ? "0" + minutes : minutes);
        $("#seconds").text(seconds < 10 ? "0" + seconds : seconds);
    } else {
       $("#countdown").hide();
        clearInterval(counter);
    }
}
UpdateTime();
let counter = setInterval(UpdateTime, 500);
//where n is the number of minutes required.
 //function getTimeRemaining(endtime) {
  //var t = Date.parse(endtime) - Date.parse(new Date());
  //var seconds = Math.floor((t / 1000) % 60);
  //return {
    //'total': t,
    //'seconds': seconds
  //};
//}

//function initializeClock(id, endtime) {
  //var clock = document.getElementById(id);
  //var secondsSpan = clock.querySelector('.seconds');

  //function updateClock() {
    //var t = getTimeRemaining(endtime);

    //secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    //if (t.total <= 0) {
      //alert("Game is over");
    //}
  //}

  //updateClock();
//}

//var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
//initializeClock('clockdiv', deadline);
