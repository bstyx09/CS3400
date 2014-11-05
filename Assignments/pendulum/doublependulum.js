// physics constants
var d2Theta1 = 0;
var d2Theta2 = 0;
var dTheta1  = 0;
var dTheta2  = 0;
var Theta1   = 0*(Math.PI)/2;
var Theta2   = 1*(Math.PI)/2;
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
	width: 800,
	height: 800
});

// background layer
var layerOne = new Kinetic.Layer();
stage.add(layerOne);

// gradient filled rectangle used as background
var grd = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: 800,
	height: 800,
	stroke: '#000',
	strokeWidth: 5,
	fillLinearGradientStartPoint: {x: 0, y: 0},
    fillLinearGradientEndPoint: {x: 800, y: 800},
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
	points: [x0, y0, x0, y0 + l1],
	stroke: 'black',
	strokeWidth: 5,
	lineCap: 'round'
});

// first circle instantiation
var circle1 = new Kinetic.Circle({
	x: x0,
	y: y0 + l1,
	radius: m1 / 2,
	fill: 'orange',
	stroke: 'black',
	strokeWidth: 1
});

// second line instantiation
var line2 = new Kinetic.Line({
	points: [x0, y0 + l1, x0, y0 + l1 + l2],
	stroke: 'black',
	strokeWidth: 5,
	lineCap: 'round'
});

// second circle instantiation
var circle2 = new Kinetic.Circle({
	x: x0,
	y: y0 + l1 + l2,
	radius: m2 / 2,
	fill: 'orange',
	stroke: 'black',
	strokeWidth: 1
});

layerTwo.add(line1);
layerTwo.add(line2);
layerTwo.add(circle1);
layerTwo.add(circle2);
layerTwo.draw();

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

	// redraw both circles
	circle1.setX(x0+l1*Math.sin(Theta1));
    circle1.setY(y0+l1*Math.cos(Theta1));
    circle2.setX(x0+l1*Math.sin(Theta1)+l2*Math.sin(Theta2));
    circle2.setY(y0+l1*Math.cos(Theta1)+l2*Math.cos(Theta2));

    // redraw both lines
    line1.setPoints([x0, y0, circle1.getX(), circle1.getY()]);
    line2.setPoints([circle1.getX(), circle1.getY(), circle2.getX(), circle2.getY()]);

}, layerTwo);

// calls animation routine
anim.start();