var canv = document.getElementById('c');
var ctx = canv.getContext('2d');
var W = window.innerWidth-5, H = window.innerHeight-5;
canv.width=H;
canv.height=H;
var scx=0,scy=0;
var sq = H/50;
var predmx,predmy;
var mouseD = false;
var trp=false;
var ipr;
var scripts = [{name:'start',text:'',x:5,y:10,ref:[]}];


function new_script(predel)
{
let sname=prompt('name');
if(!sname) return;
var ref = scripts.length;
predel.ref	.push(ref);
scripts.push({name:sname,x:predel.x+12,y:predel.y,ref:[]});
}

canv.onmousedown = function(e) {mouseD=true;predmx=e.clientX/sq;predmy=e.clientY/sq;
for(var i=0;i<scripts.length;i++)
 {
  let el = scripts[i];
  if(predmx>=el.x&&predmx<=el.x+10&&predmy>=el.y&&predmy<=el.y+3) {trp=true;ipr=i;return;}
 }
};
canv.onmouseup = function() {mouseD=false;};
canv.onmouseleave = function() {mouseD=false;};
canv.onmousemove = function(e) {
let mx=e.clientX/sq;
let my=e.clientY/sq;

if(!mouseD) {predmx=Math.floor(e.clientX/sq)-scx;predmy=Math.floor(e.clientY/sq)-scy;return;}
if(!trp) return;
scripts[ipr].x+=mx-predmx;
scripts[ipr].y+=my-predmy;
predmx=mx;predmy=my;
};

canv.onclick=function(e)
{
let mx=e.clientX/sq-scx;
let my=e.clientY/sq-scy;
for(var i=0;i<scripts.length;i++)
 {
  let el = scripts[i];
  console.log("name:"+el.name+", "+mx+'=mx,my='+my+',el.x='+(el.x+9)*1+',el.y='+1*(el.y+1));
  if(mx>=(el.x+9)&&mx<=(el.x+10-0)&&my>=(el.y+1-0)&&my<=(el.y+2-0)) return new_script(el);
 }
};
canv.ondblclick=function(e){
let mx=e.clientX/sq-scx;
let my=e.clientY/sq-scy;
for(var i=0;i<scripts.length;i++)
{
let el = scripts[i];
  if(predmx>=el.x&&predmx<=el.x+10&&predmy>=el.y&&predmy<=el.y+3) {el.text=prompt("Script",el.text);return;}	
}
};

document.body.onkeydown=function(e){
var key=e.keyCode;
console.log(key);
if(key==37)scx--;
else if(key==38) scy--;
else if(key==39) scx++;
else if(key==40) scy++;
};
function recDraw(ind)
{
//console.log('efgwjk');
let el = scripts[ind];
if(ind) {ctx.lineTo(sq*el.x,sq*(el.y+1.5));ctx.stroke();}

ctx.fillStyle='#e0e0e0';
ctx.fillRect(sq*(el.x-scx),sq*(el.y-scy),sq*10,sq*3);

ctx.fillStyle='#eeffff';
if(!mouseD&&(predmx>=(el.x+9)&&predmx<=(el.x+10)&&predmy>=(el.y+1)&&predmy<=(el.y+1))) ctx.fillStyle='#e0ffe0';
ctx.fillRect(sq*(el.x-scx+9),sq*(el.y-scy+1),sq,sq);

ctx.fillStyle='#ffefff';
ctx.font=2*sq+'px Sans-serif';
ctx.fillText(el.name,sq*(1+	el.x-scx),sq*(el.y-scy+2));
//console.log(el);\
ctx.fillStyle='#aa1111';
ctx.font=sq+'px Arial';
if(el.text)ctx.fillText(el.text+'',sq*(el.x-scx),sq*(el.y+3));
for(var i=0;i<el.ref.length;i++)
{
ctx.beginPath();
ctx.moveTo((el.x-scx+10)*sq,(el.y-scy+1.5)*sq);
recDraw(el.ref[i]);}
}

function draw()
{
ctx.fillStyle='white';
ctx.fillRect(0,0,W,H);
ctx.strokeStyle='grey';
recDraw(0);
ctx.stroke();

setTimeout(draw,100);	
}
draw();
