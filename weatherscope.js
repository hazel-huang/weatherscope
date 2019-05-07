//load weather() after DOM
document.addEventListener('DOMContentLoaded',startDrawing);

//animation time interval function
var startDrawing = function(){setInterval(weather, 100);}

//variable holding state of weather
var currentWeather = "sunny";

//variables for each weather state
var weatherVar = {
  sunny: {
    start: "#55c3e8",
    end: "#ccffff",
    backHill: "#084956",
    frontHill: "#106677",
    cloud: "white",
    cloudNum: randInt(2,4),
    unicode: "&#9728"
  },
  cloudy: {
    start: "#4c7982",
    end: "#ceb478",
    backHill: "#254147",
    frontHill: "#375960",
    cloud: "#c2d6d6",
    cloudNum: randInt(10,14),
    unicode: "&#9729"
  },
  rainy: {
    start: "#23233a",
    end: "#6C92B6",
    backHill: "#151c1e",
    frontHill: "#1f2a2d",
    cloud: "#23233a",
    cloudNum: randInt(4,8),
    unicode: "&#9730"
  }
};

//DRAW WEATHER SCREEN FUNCTION
function weather() {

  //canvas variables
  var c = document.getElementById("weatherScreen");
  var ctx = c.getContext("2d"); //drawing object

  //drawing the sky
  var skyGrad = ctx.createLinearGradient(0,0,0,c.height);

  skyGrad.addColorStop(0, weatherVar[currentWeather].start);
  skyGrad.addColorStop(1, weatherVar[currentWeather].end);

  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, c.width, c.height);

  //drawing the sun
  ctx.beginPath();
  ctx.arc(150, 100, 35, 0, 2 * Math.PI);
  ctx.fillStyle = "#ffcc00";
  ctx.fill();

  //drawing the hills
  //back hill
  ctx.beginPath();
  ctx.moveTo(350, c.height);
  ctx.quadraticCurveTo(700, 120, c.width+150, c.height);
  ctx.fillStyle = weatherVar[currentWeather].backHill;
  ctx.fill();

  //front hill
  ctx.beginPath();
  ctx.moveTo(-150, c.height);
  ctx.quadraticCurveTo(100, 90, c.width-250, c.height);
  ctx.fillStyle = weatherVar[currentWeather].frontHill;
  ctx.fill();

  //drawing clouds
  drawClouds();

}

//DRAW RANDOMLY GENERATED CLOUDS
//random integer generator
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

//array of random numbers to use as random cloud coordinates
var randX = [randInt(-50,100),randInt(100,400),randInt(500,700),randInt(200,700),randInt(500,700),randInt(0,700)];
var randY = [randInt(20,140),randInt(50,140),randInt(20,140),randInt(80,140),randInt(50,140),randInt(50,140)];

function drawClouds() {

  for (i=0; i<weatherVar[currentWeather].cloudNum; i++) {

    randX[i]+=0.25; //movement of cloud variable incrementation
    if (randX[i] == 1000) { //reset cloud after it leaves right of screen
      randX[i] = -100;
    }

    var c = document.getElementById("weatherScreen");
    var ctx = c.getContext("2d");

    //middle cloud peak 1
    ctx.beginPath();
    ctx.ellipse(randX[i], randY[i], 25, 41, Math.PI / 2, 0, 2 * Math.PI);
    ctx.fillStyle = weatherVar[currentWeather].cloud;
    ctx.fill();

    //middle cloud peak 2
    ctx.beginPath();
    ctx.ellipse(randX[i]+35, randY[i], 25, 41, Math.PI / 2, 0, 2 * Math.PI);
    ctx.fillStyle = weatherVar[currentWeather].cloud;
    ctx.fill();

    //left cloud peak 1
    ctx.beginPath();
    ctx.ellipse(randX[i]-35, randY[i], 15, 29, Math.PI / 2, 0, 2 * Math.PI);
    ctx.fillStyle = weatherVar[currentWeather].cloud;
    ctx.fill();

    //right cloud peak
    ctx.beginPath();
    ctx.ellipse(randX[i]+70, randY[i], 15, 29, Math.PI / 2, 0, 2 * Math.PI);
    ctx.fillStyle = weatherVar[currentWeather].cloud;
    ctx.fill();

  }
}

//RAIN FUNCTIONS
var c = document.getElementById('weatherScreen');
var ctx = c.getContext('2d');

var rainNum = 1200;
var rain = [];

function createRain() {
  for (var i = 0; i < rainNum; i++) {
    rain[i] = {
      x: Math.random() * c.width,    //random raindropsdrop x coord
      y: Math.random() * c.height,   //random raindrop y coord
    };
  }
}

//function to draw rain strokes
function drawRain(i) {
  ctx.beginPath();
  ctx.moveTo(rain[i].x, rain[i].y);
  ctx.lineTo(rain[i].x + 2, rain[i].y + 7);
  ctx.lineCap = "round";
  ctx.strokeStyle = "#23233a";
  ctx.lineWidth = 2;
  ctx.stroke();
}

//describing rain animation
function animateRain() {
  if (currentWeather == "sunny" || currentWeather == "cloudy") {
    weather();
  } else if (currentWeather == "rainy") {
    weather();
    for (var i = 0; i < rainNum; i+=3) { //rain vertical movement incrementation
      rain[i].x += 1;
      rain[i].y += 5;
      if (rain[i].x > c.width || rain[i].y > c.height) { //resetting raindrop position once offscreen
        rain[i].x = Math.random() * c.width;
        rain[i].y = -20;
      }
      drawRain(i);
    }
  }
}

//calling rain animation
function rainLoop() {
  if (currentWeather == "rainy") {
    createRain();
    animateRain();
  } else {
    weather();
  }
  requestAnimationFrame(rainLoop);
}

rainLoop();


//CHANGING THE WEATHER PER BUTTON PRESS

var buttonPress = 1;
var weatherState = ["rainy", "sunny", "cloudy"];

function changeButton() { //change weather symbol & weather state by clicking on title

  var button = document.getElementById("weatherButton");

  currentWeather = weatherState[buttonPress];
  button.innerHTML = "weatherscope " + weatherVar[currentWeather].unicode;

  buttonPress += 1;

  if (buttonPress == 3) { //reset buttonPress to continue looping through weather states
    buttonPress = 0;
  }

}
