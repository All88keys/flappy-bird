var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var a = .5;
var v = 8;
var t = 0;
document.addEventListener('keydown',function (e) {
  if(e.keyCode == 32){
    t=0
  }
})

var flappy = {
  x : c.width/2,
  y : c.height/2,
  size : 25,
  draw : function () {
    ctx.fillRect(this.x,this.y,this.size,this.size);
  }
}

var test = new pipe(160,130);

setInterval(function () {
  ctx.clearRect(0,0,c.width,c.height);
  test.update();
  flappy.y+= a*t - v;
  flappy.draw();
  t++;
},18);


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
    if (flappy.y<this.ty+this.th && flappy.x<this.tx+this.tw) {
      console.log('ECH');
    }
    ctx.fillRect(this.tx,this.ty,this.tw,this.th);
    ctx.fillRect(this.bx,this.by,this.bw,this.bh);
  }
}
