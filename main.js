var game_over = new Image();
game_over.src = "game_over.png";

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var keys = [];
var tick = 0;
document.addEventListener('keydown',function (e) {
  keys[e.keyCode] = true;
}, false)
document.addEventListener('keyup',function (e) {
  keys[e.keyCode] = false;
  if(e.keyCode == 32)flappy.jump = true;
}, false)

//returns random inclusive int
function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//player object
var flappy = {
  x : c.width/2,
  y : c.height/2,
  a : .5, //acceleration
  v : 8, //velocity
  t : 0, //time
  size : 25,
  alive : true,
  jump : true,
  score : 0,
  update : function () {
    if(keys[32] && this.jump && flappy.alive){
      this.t = 0;
      this.jump = false;
    }
    this.y+= this.a*this.t - this.v;
    if (this.y+this.size>c.height) {
      this.y = c.height-this.size
    }
    this.t++;
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.x,this.y,this.size,this.size);
  }
}

//pipe object
function pipe(tlength, blength){
  this.tx = c.width;
  this.ty = 0;
  this.th = tlength;
  this.tw = 50;

  this.bx = c.width;
  this.by = c.width-blength;
  this.bh = blength;
  this.bw = this.tw;

  this.update = function () {
    this.tx--;
    this.bx--;
    if ((flappy.y+flappy.size>this.by || flappy.y<this.ty+this.th) && ((flappy.x+flappy.size<this.tx+this.tw && flappy.x+flappy.size>this.tx) || (flappy.x<this.tx+this.tw && flappy.x>this.tx))) {
      flappy.alive = false;
    }
  }
  this.draw = function () {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.tx,this.ty,this.tw,this.th);
    ctx.fillRect(this.bx,this.by,this.bw,this.bh);
  }
}
var pipes = [];

function newGame() {
  pipes = [];
  tick = 0;
  flappy.x = c.width/2;
  flappy.y = c.height/2;
  flappy.t = 0;
  flappy.alive  = true;
}

//game loop
function loop() {
  ctx.clearRect(0,0,c.width,c.height); //clear screen
  //draw pipes
  for (var i = 0; i < pipes.length; i++) {
    pipes[i].draw();
  }
  flappy.update(); //update player

  //events only run while game is in progress
  if (flappy.alive) {
    for (var i = 0; i < pipes.length; i++) {
      pipes[i].update();
    }
    if (tick%200 == 0) {
      let tlength = rand(c.width/5,c.width/5*4);
      pipes.push(new pipe(tlength, c.height-(tlength+ 110)));
    }
  }else {
    ctx.drawImage(game_over,0,0);

    if (keys[32] &&  flappy.jump) {
      newGame();
    }
  }

  tick++;
  window.requestAnimationFrame(loop);
}


//begin loop
window.requestAnimationFrame(loop);
