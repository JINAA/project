var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

//고양이 그림 부르기
var catImage = [];
catImage[0] = new Image();
catImage[1] = new Image();
catImage[0].src = "cat1.png";
catImage[1].src = "cat2.png";
//배경 그림 부르기
var bg = new Image();
var bgLoad = false;
bg.onload = function() {
	bgLoad = true;
}
bg.src = 'bg.png';

//장애물  그림 부르기
var objImage = new Image();
// var objLoad = false;
// objImage.onload = function() {
// 	objLoad = true;
// }
objImage.src = "obj.png";
//장애물 변수
var data = {
	"sx":35,
	"sy":460,
	"w":235,
	"h":300,
	"x":400,
	"y":240,
	"status":1
};
//장애물 그리기
function drawobj() {
	ctx.drawImage(objImage,data.sx,data.sy,data.w,data.h
		,data.x,data.y,data.w / 4,data.h / 3.5 );
		data.x -= 2;
}
//장애물 충돌감지
function collision() {
	var distanceX = ((catX-25)+catX/2)-data.x;
	var distanceY = (catY+catY/2)-data.y;
	var distance = (distanceX * distanceX) + (distanceY * distanceY);

	if (data.status == 1) {
		if (distance <= data.w + (catwidth/2) * data.h + (catheight/2)){
			alert("GAME OVER");
		}
	}
}

//배경 변수
var sizeX = 550;
var sizeY = 350;
var ddx = - 0.75;
var bgX = 0;
var i = 0;
//배경그리기
function drawbg() {
	i=i+2;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(bg,0 - i,0,sizeX, sizeY);
	ctx.drawImage(bg,0 - i + sizeX,0,sizeX, sizeY);

	if (i == sizeX ) {
		i = 0;
	}
}

//고양이 사이즈와 초기좌표
var catwidth = 90;
var catheight = 90;
var catX = 100;
var catY = 220;
//고양이 움직임
var dx = 0;
var dy = -7;
//고양이 중력
var g = 0.2;
//고양이 그리기
var count = 0;
var idx = 0;
var delay = 10;
function drawcat() {
	catX += dx;
	dy = dy + g;
	catY += dy;

	if (catX >= 500 || catX <= 0) {
		dx = -dx;
	}
	if(catY >= 230) {
		catY = 230;
	}

	count++;
	if (count >= delay) {
		idx++;
	if (idx > 1) {
		idx = 0;
	}
		count = 0;
	}

	if (catY != 230) {
		ctx.drawImage(catImage[0],catX,catY,catwidth,catheight);
	} else {
		ctx.drawImage(catImage[idx],catX,catY,catwidth,catheight);
	}
}

//키보드 조작
document.addEventListener("keypress", jump);
//점프 실행 함수
function jump() {
	if (event.keyCode == 32) {
		if (catY > canvas.height / 2){
			dy = -7.5;
		}
	}
}

//그리기
function drawAll() {
	ctx.clearRect(0,0,canvas.width,canvas.height);

	drawbg();
	drawobj();
	drawcat();
	collision();

	requestAnimationFrame(drawAll);

}

requestAnimationFrame(drawAll);
