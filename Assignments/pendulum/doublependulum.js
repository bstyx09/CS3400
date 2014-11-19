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
	width: 896,
	height: 796
});

// background layer
var layerOne = new Kinetic.Layer();
stage.add(layerOne);

// gradient filled rectangle used as background
var grd = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: 896,
	height: 796,
	stroke: '#000',
	strokeWidth: 0,
	fillLinearGradientStartPoint: {x: 0, y: 0},
    fillLinearGradientEndPoint: {x: 896, y: 796},
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
	stroke: 'black',
	strokeWidth: 5,
	lineCap: 'round'
});

// first circle instantiation
var circle1 = new Kinetic.Circle({
	radius: m1 / 2,
	fill: 'orange',
	stroke: 'black',
	strokeWidth: 1
});

// second line instantiation
var line2 = new Kinetic.Line({
	stroke: 'black',
	strokeWidth: 5,
	lineCap: 'round'
});

// second circle instantiation
var circle2 = new Kinetic.Circle({
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


var trail2 = new Kinetic.Line({
    points:[0,0,0,0],
    stroke:"yellow",
    strokeWidth:1
});


var trailShort1 = new Kinetic.Line({
    points:[0,0,0,0],
    stroke:"purple",
    strokeWidth:1
});


var trailShort2 = new Kinetic.Line({
    points:[0,0,0,0],
    stroke:"yellow",
    strokeWidth:1
});


var graphBar1 = new Kinetic.Rect({
	x: 775,
	y: 400,
	width: 10,
	height: 0,
	fill: 'white',
	stroke: 'white',
	strokeWidth: 1
});

var graphBar2 = new Kinetic.Rect({
	x: 815,
	y: 400,
	width: 10,
	height: 0,
	fill: 'white',
	stroke: 'white',
	strokeWidth: 1
});

var graphBar3 = new Kinetic.Rect({
	x: 855,
	y: 400,
	width: 10,
	height: 0,
	fill: 'white',
	stroke: 'white',
	strokeWidth: 1
});

var P = new Kinetic.Text({
	x: 760,
	y: 394,
	text: 'P',
	fontSize: 14,
	fontFamily: 'Calibri',
	fill: 'white'
});

var K = new Kinetic.Text({
	x: 800,
	y: 394,
	text: 'K',
	fontSize: 14,
	fontFamily: 'Calibri',
	fill: 'white'
});

var T = new Kinetic.Text({
	x: 840,
	y: 394,
	text: 'T',
	fontSize: 14,
	fontFamily: 'Calibri',
	fill: 'white'
});

var graphBar3

layerTwo.add(line1);
layerTwo.add(line2);
layerTwo.add(circle1);
layerTwo.add(circle2);
layerTwo.add(trail1);
layerTwo.add(trail2);
layerTwo.add(trailShort1);
layerTwo.add(trailShort2);
layerTwo.add(graphBar1);
layerTwo.add(graphBar2);
layerTwo.add(graphBar3);
layerTwo.add(P);
layerTwo.add(K);
layerTwo.add(T);
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
	
	// resets paths
    points=[];
	trail1.setPoints(points);
	points2=[];
	trail2.setPoints(points2);
	pointsShort1=[];
	trailShort1.setPoints(pointsShort1);
	pointsShort2=[];
	trailShort2.setPoints(pointsShort2);

	// resets graph bar heights
	graphBar1.setHeight(0);
	graphBar2.setHeight(0);
	graphBar3.setHeight(0);

    layerTwo.draw();
};

/** REPEATEDLY CALLED CALCULATIONS AND SUBSEQUENT ANIMATION ******************/
var anim = new Kinetic.Animation(function(frame) {

	// local time variable set to the difference between animation updates
	var t = frame.timeDiff * 0.01;

	// calculations from formula, no friction present
	mu        =  1 + (m1 / m2);
	d2Theta1  =  (g * (Math.sin(Theta2) * Math.cos(Theta1-Theta2) - mu * Math.sin(Theta1)) - (l2 * dTheta2 * dTheta2 + l1 * dTheta1 * dTheta1 * Math.cos(Theta1-Theta2)) * Math.sin(Theta1-Theta2)) / (l1 * (mu - Math.cos(Theta1 - Theta2) * Math.cos(Theta1 - Theta2)));
	d2Theta2  =  (mu * g * (Math.sin(Theta1) * Math.cos(Theta1 - Theta2) - Math.sin(Theta2)) + (mu * l1 * dTheta1 * dTheta1 + l2 * dTheta2 * dTheta2 * Math.cos(Theta1 - Theta2)) * Math.sin(Theta1 - Theta2)) / (l2 * (mu - Math.cos(Theta1 - Theta2) * Math.cos(Theta1 - Theta2)));
	dTheta1   += d2Theta1 * t;
	dTheta2   += d2Theta2 * t;
	Theta1    += dTheta1 * t;
	Theta2    += dTheta2 * t;

	// graph representation of potential energy of the system
	var potentialEnergy = (-1 * ((m1/100) + (m2/100)) * g * l1 * Math.cos(Theta1) - (m2/100) * g * l2 * Math.cos(Theta2)) / 15;
	graphBar1.setHeight(potentialEnergy);
	
	// graph representation of kinetic energy of the system
	var kineticEnergy = (.5 * (m1/100) * Math.pow(l1, 2) * Math.pow(dTheta1, 2) + .5 * (m2/100) * ( Math.pow(l1, 2) * Math.pow(dTheta1, 2) + Math.pow(l2, 2) * Math.pow(dTheta2, 2) + 2 * l1 * l2 * dTheta1 * dTheta2 * Math.cos(Theta1 - Theta2))) / 15;
	graphBar2.setHeight(kineticEnergy);

	// total energy of the system
	graphBar3.setHeight(potentialEnergy + kineticEnergy);

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
	
	pointsShort1.push(circle1.getX(),circle1.getY());
	if(pointsShort1.length>50){
		pointsShort1.shift();
		pointsShort1.shift();
	}
	trailShort1.setPoints(pointsShort1);
	
	pointsShort2.push(circle2.getX(),circle2.getY());
	if(pointsShort2.length>50){
		pointsShort2.shift();
		pointsShort2.shift();
	}
	trailShort2.setPoints(pointsShort2);
	
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

	// defaults HTML input field and slider values
	document.getElementById("m1Input").value = 25;
	document.getElementById("m1Slider").value = 25;
	document.getElementById("m2Input").value = 25;
	document.getElementById("m2Slider").value = 25;
	document.getElementById("a1Input").value = 0;
	document.getElementById("a1Slider").value = 0;
	document.getElementById("a2Input").value = 1;
	document.getElementById("a2Slider").value = 1;

	// custom event used to trigger event handlers below
	var event = new Event('change');
	document.getElementById("full").checked = true;
	document.getElementById("full").dispatchEvent(event);
	document.getElementById("line1Set").checked = true;
	document.getElementById("line1Set").dispatchEvent(event);
	document.getElementById("circle1Set").checked = true;
	document.getElementById("circle1Set").dispatchEvent(event);
	document.getElementById("trail1Set").checked = true;
	document.getElementById("trail1Set").dispatchEvent(event);
	document.getElementById("line2Set").checked = true;
	document.getElementById("line2Set").dispatchEvent(event);
	document.getElementById("circle2Set").checked = true;
	document.getElementById("circle2Set").dispatchEvent(event);
	document.getElementById("trail2Set").checked = true;
	document.getElementById("trail2Set").dispatchEvent(event);

	// redraws elements
	setAndDraw();

});

/** CHANGES M1 VARIABLE ******************************************************/

document.getElementById("m1Input").addEventListener("input", function(){
	m1 = document.getElementById("m1Input").value;
	setAndDraw();
});

document.getElementById("m1Slider").addEventListener("change", function(){
	m1 = document.getElementById("m1Slider").value;
	setAndDraw();
});

/** CHANGES M2 VARIABLE ******************************************************/

document.getElementById("m2Input").addEventListener("input", function(){
	m2 = document.getElementById("m2Input").value;
	setAndDraw();
});

document.getElementById("m2Slider").addEventListener("change", function(){
	m2 = document.getElementById("m2Slider").value;
	setAndDraw();
});

/** CHANGES THETA1 VARIABLE **************************************************/

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

/** CHANGES THETA2 VARIABLE **************************************************/

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


/** LINE VISIBILITY CHECKS ***************************************************/
document.getElementById("line1Set").addEventListener("change", function(){
	if(document.getElementById("line1Set").checked) 
	{
		line1.visible(true);
	}else
	{
		line1.visible(false);
	}
	setAndDraw();
});

document.getElementById("line2Set").addEventListener("change", function(){
	if(document.getElementById("line2Set").checked) 
	{
		line2.visible(true);
	}else
	{
		line2.visible(false);
	}
	setAndDraw();
});

/** CIRCLE VISIBILITY CHECKS *************************************************/

document.getElementById("circle1Set").addEventListener("change", function(){
	if(document.getElementById("circle1Set").checked) 
	{
		circle1.visible(true);
	}else
	{
		circle1.visible(false);
	}
	setAndDraw();
});

document.getElementById("circle2Set").addEventListener("change", function(){
	if(document.getElementById("circle2Set").checked) 
	{
		circle2.visible(true);
	}else
	{
		circle2.visible(false);
	}
	setAndDraw();
});

/** TRAIL VISIBILITY CHECKS **************************************************/

document.getElementById("trail1Set").addEventListener("change", function(){
	if(document.getElementById('trail1Set').checked) {
		if(document.getElementById('full').checked)
		{
			trail1.visible(true);
			
		}else
		{
			trailShort1.visible(true);
		}
	}else{
		trail1.visible(false);
		trailShort1.visible(false);
	}
	setAndDraw();
});

document.getElementById("trail2Set").addEventListener("change", function(){
	if(document.getElementById('trail2Set').checked) {
		if(document.getElementById('full').checked)
		{
			trail2.visible(true);
			
		}else
		{
			trailShort2.visible(true);
		}
	}else{
		trail2.visible(false);
		trailShort2.visible(false);
	}
	setAndDraw();
});

document.getElementById("full").addEventListener("change", function(){
	if(document.getElementById("trail1Set").checked){
		trail1.visible(true);
		trailShort1.visible(false);
	}
	if(document.getElementById("trail2Set").checked){
		trail2.visible(true);
		trailShort2.visible(false);
	}
	setAndDraw();
});

document.getElementById("comet").addEventListener("change", function(){
	if(document.getElementById("trail1Set").checked){
		trail1.visible(false);
		trailShort1.visible(true);
	}
	if(document.getElementById("trail2Set").checked){
		trail2.visible(false);
		trailShort2.visible(true);
	}
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