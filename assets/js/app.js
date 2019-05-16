

// var svg = d3.select("#scatter").append("svg");

// svg.attr("width", "100px").attr("height", "100px");

// var circles = svg.selectAll("circle");

// var rValues = [40, 25, 10];

// circles.data(rValues)
// 	.enter()
// 	.append("circle")
// 	.attr("cx", 50)
// 	.attr("cy", 50)
// 	.attr("r", function(d) {
// 		return d;
// 	})
// 	.attr("stroke", "black")
// 	.attr("stroke-width", "5")
// 	.attr("fill", "red");

//////////


var width = 1150;
var height = 600;

var svg = d3.select("#scatter")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

var chartGroup = svg.append("g");


d3.csv("assets/data/data.csv").then(function(dataCSV) {
	console.log(dataCSV);

	Object.values(dataCSV).forEach(
		function(data) {
			data.poverty = +data.poverty;
			data.obesity = +data.obesity;
		}
	);

	var xLinearScale = d3.scaleLinear().domain([d3.min(dataCSV,d=>d.poverty)-1, d3.max(dataCSV,d=>d.poverty)+1]).range([0, width]);
	var yLinearScale = d3.scaleLinear().domain([d3.min(dataCSV,d=>d.obesity)-1, d3.max(dataCSV,d=>d.obesity)+1]).range([height, 0]);

	var bottomAxis = d3.axisBottom(xLinearScale);
	var leftAxis = d3.axisLeft(yLinearScale);

	chartGroup.append("g").call(bottomAxis);

	chartGroup.append("g").call(leftAxis);




});