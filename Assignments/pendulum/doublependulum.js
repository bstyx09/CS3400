// physics constants
var d2Theta1 = 0;
var d2Theta2 = 0;
var dTheta1  = 0;
var dTheta2  = 0;
var theta1 	 = 0;
var theta2   = 1;
var Theta1   = theta1*(Math.PI)/2;
var Theta2   = theta2*(Math.PI)/2;
var mu 	   	 = 0;
var m1 		 = 25;
var m2       = 25;
var l1       = 150;
var l2       = 150;
var x0       = 400;
var y0       = 350;
var g        = 9.8;

var stage = new Kinetic.Stage({
	container: 'container',
	width: 796,
	height: 796
});

// background layer
var layerOne = new Kinetic.Layer();
stage.add(layerOne);

// gradient filled rectangle used as background
var grd = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: 796,
	height: 796,
	stroke: '#000',
	strokeWidth: 0,
	fillLinearGradientStartPoint: {x: 0, y: 0},
    fillLinearGradientEndPoint: {x: 796, y: 796},
    fillLinearGradientColorStops: [0, '#009DFF', 1, '#000DFF']
});

var base = new Kinetic.Line({
	points: [x0-1, y0, x0+1, y0],
	stroke: 'black',
	strokeWidth: 7,
	lineCap: 'round'
});

layerOne.add(grd);
layerOne.add(base);
layerOne.draw();

// animated layer
var layerTwo = new Kinetic.Layer();
stage.add(layerTwo);

// first line instantiation
var line1 = new Kinetic.Line({
	// points: [x0, y0, x0, y0 + l1],
	stroke: 'black',
	strokeWidth: 5,
	lineCap: 'round'
});

// first circle instantiation
var circle1 = new Kinetic.Circle({
	// x: x0,
	// y: y0 + l1,
	radius: m1 / 2,
	fill: 'orange',
	stroke: 'black',
	strokeWidth: 1
});

// second line instantiation
var line2 = new Kinetic.Line({
	// points: [x0, y0 + l1, x0, y0 + l1 + l2],
	stroke: 'black',
	strokeWidth: 5,
	lineCap: 'round'
});

// second circle instantiation
var circle2 = new Kinetic.Circle({
	// x: x0,
	// y: y0 + l1 + l2,
	radius: m2 / 2,
	fill: 'orange',
	stroke: 'black',
	strokeWidth: 1
});

var trail1 = new Kinetic.Line({
    points:[0,0,0,0],
    stroke:"purple",
    strokeWidth:1
});
layerTwo.add(trail1);

var trail2 = new Kinetic.Line({
    points:[0,0,0,0],
    stroke:"green",
    strokeWidth:1
});
layerTwo.add(trail2);


layerTwo.add(line1);
layerTwo.add(line2);
layerTwo.add(circle1);
layerTwo.add(circle2);
setAndDraw();

function setAndDraw(){

	// redraw both circles
	circle1.setX(x0+l1*Math.sin(Theta1));
    circle1.setY(y0+l1*Math.cos(Theta1));
    circle1.setRadius(m1/2);
    circle2.setX(x0+l1*Math.sin(Theta1)+l2*Math.sin(Theta2));
    circle2.setY(y0+l1*Math.cos(Theta1)+l2*Math.cos(Theta2));
    circle2.setRadius(m2/2);

    // redraw both lines
    line1.setPoints([x0, y0, circle1.getX(), circle1.getY()]);
    line2.setPoints([circle1.getX(), circle1.getY(), circle2.getX(), circle2.getY()]);
	
	//trail1.setPoints([circle1.getX(), circle1.getY(),circle1.getX(), circle1.getY()]);
	//trail2.setPoints([circle2.getX(), circle2.getY(),circle2.getX(), circle2.getY()]);
	
	if(document.getElementById('line1Set').checked) {
		line1.visible(true);
	}else{
		line1.visible(false);
	}
	
	if(document.getElementById('line2Set').checked) {
		line2.visible(true);
	}else{
		line2.visible(false);
	}
	
	points=[];
	points2=[];
	
    layerTwo.draw();
};

function toggleTrail1Vis()
{
	if(document.getElementById('trail1Set').checked) {
		trail1.visible(true);
	}else{
		trail1.visible(false);
	}
}

function toggleTrail2Vis()
{
	if(document.getElementById('trail2Set').checked) {
		trail2.visible(true);
	}else{
		trail2.visible(false);
	}
}

//points=[];
//points2=[];

// calculation routines and animation function which is called repeatedly
var anim = new Kinetic.Animation(function(frame) {

	var t = frame.timeDiff * 0.01;

	// calculations from formula, no friction present
	mu        =  1 + (m1 / m2);
	d2Theta1  =  (g * (Math.sin(Theta2) * Math.cos(Theta1-Theta2) - mu * Math.sin(Theta1)) - (l2 * dTheta2 * dTheta2 + l1 * dTheta1 * dTheta1 * Math.cos(Theta1-Theta2)) * Math.sin(Theta1-Theta2)) / (l1 * (mu - Math.cos(Theta1 - Theta2) * Math.cos(Theta1 - Theta2)));
	d2Theta2  =  (mu * g * (Math.sin(Theta1) * Math.cos(Theta1 - Theta2) - Math.sin(Theta2)) + (mu * l1 * dTheta1 * dTheta1 + l2 * dTheta2 * dTheta2 * Math.cos(Theta1 - Theta2)) * Math.sin(Theta1 - Theta2)) / (l2 * (mu - Math.cos(Theta1 - Theta2) * Math.cos(Theta1 - Theta2)));
	dTheta1   += d2Theta1 * t;
	dTheta2   += d2Theta2 * t;
	Theta1    += dTheta1 * t;
	Theta2    += dTheta2 * t;

	var xStep = circle1.getX();
	var yStep = circle1.getY();

	// redraw both circles
	circle1.setX(x0+l1*Math.sin(Theta1));
    circle1.setY(y0+l1*Math.cos(Theta1));
    circle2.setX(x0+l1*Math.sin(Theta1)+l2*Math.sin(Theta2));
    circle2.setY(y0+l1*Math.cos(Theta1)+l2*Math.cos(Theta2));

    // redraw both lines
    line1.setPoints([x0, y0, circle1.getX(), circle1.getY()]);
    line2.setPoints([circle1.getX(), circle1.getY(), circle2.getX(), circle2.getY()]);
	
	points.push(circle1.getX(),circle1.getY());
	trail1.setPoints(points);
	
	points2.push(circle2.getX(),circle2.getY());
	trail2.setPoints(points2);

}, layerTwo);

// calls animation routine
document.getElementById("startButton").addEventListener("click", function(){
	anim.start();
});

// stops animation routine
document.getElementById("stopButton").addEventListener("click", function(){
	anim.stop();
});

// resets variables to defaults, redraws and defaults field values
document.getElementById("resetButton").addEventListener("click", function(){
	
	// re-initializes variables to default state
	d2Theta1 = 0;
	d2Theta2 = 0;
	dTheta1  = 0;
	dTheta2  = 0;
	theta1 	 = 0;
	theta2   = 1;
	Theta1   = theta1*(Math.PI)/2;
	Theta2   = theta2*(Math.PI)/2;
	mu 	   	 = 0;
	m1 		 = 25;
	m2       = 25;
	l1       = 150;
	l2       = 150;
	x0       = 400;
	y0       = 350;
	g        = 9.8;

	// redraws elements
	setAndDraw();

	// defaults HTML input field and slider values
	document.getElementById("m1Input").value = 25;
	document.getElementById("m1Slider").value = 25;
	document.getElementById("m2Input").value = 25;
	document.getElementById("m2Slider").value = 25;
	document.getElementById("a1Input").value = 0;
	document.getElementById("a1Slider").value = 0;
	document.getElementById("a2Input").value = 1;
	document.getElementById("a2Slider").value = 1;

});

// changes m1 variable
document.getElementById("m1Input").addEventListener("input", function(){
	m1 = document.getElementById("m1Input").value;
	setAndDraw();
});

document.getElementById("m1Slider").addEventListener("change", function(){
	m1 = document.getElementById("m1Slider").value;
	setAndDraw();
});

// changes m2 variable
document.getElementById("m2Input").addEventListener("input", function(){
	m2 = document.getElementById("m2Input").value;
	setAndDraw();
});

document.getElementById("m2Slider").addEventListener("change", function(){
	m2 = document.getElementById("m2Slider").value;
	setAndDraw();
});

// changes theta1 variable
document.getElementById("a1Input").addEventListener("input", function(){
	theta1 = document.getElementById("a1Input").value;
	Theta1 = theta1*(Math.PI)/2;
	setAndDraw();
});

document.getElementById("a1Slider").addEventListener("change", function(){
	theta1 = document.getElementById("a1Slider").value;
	Theta1 = theta1*(Math.PI)/2;
	setAndDraw();
});

// changes theta2 variable
document.getElementById("a2Input").addEventListener("input", function(){
	theta2 = document.getElementById("a2Input").value;
	Theta2 = theta2*(Math.PI)/2;
	setAndDraw();
});

document.getElementById("a2Slider").addEventListener("change", function(){
	theta2 = document.getElementById("a2Slider").value;
	Theta2 = theta2*(Math.PI)/2;
	setAndDraw();
});

function fileLoad(){
	m1 = document.getElementById("m1Input").value;
	m2 = document.getElementById("m2Input").value;
	theta1 = document.getElementById("a1Input").value;
	Theta1 = theta1*(Math.PI)/2;
	theta2 = document.getElementById("a2Input").value;
	Theta2 = theta2*(Math.PI)/2;
	setAndDraw();
};