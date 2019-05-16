
var svgWidth = 900;
var svgHeight = 300;

var margin = {
	top: 20,
	right: 40,
	bottom: 60,
	left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter").append("svg").attr("width", svgWidth).attr("height", svgHeight);

var chartGroup = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

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

	chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);
	
	chartGroup.append("g").call(leftAxis);

	var circleGroup = chartGroup.selectAll(".stateCircle").data(dataCSV).enter().append("circle").attr("class","stateCircle")
		.attr("cx", function(d){return xLinearScale(d.poverty)})
		.attr("cy", function(d){return yLinearScale(d.obesity)}).attr("r", "15").attr("opacity", ".9");

	var circleText = chartGroup.selectAll(".stateText").data(dataCSV).enter().append("text").attr("class", "stateText")
		.attr("x", function(d){return xLinearScale(d.poverty)})
		.attr("y", function(d){return yLinearScale(d.obesity)}).attr('text-anchor', 'middle').attr('alignment-baseline', 'middle')
		.style('font-size', "10").text(function(d) {return d.abbr;});

	var toolTip = d3.tip().attr("class", "d3-tooltip").offset([80, -60]).attr("background-color","black")
	.html(function(d) {
		return (`${d.state}<br>poor people: ${d.poverty}%<br>obesity: ${d.obesity}%`);
	});

	chartGroup.call(toolTip);
	
	circleGroup.on();

	circleText.on();

	chartGroup.append("text").attr("transform", "rotate(-90)")
		.attr("y", 0 - margin.left + 40).attr("x", 0 - (height / 2))
		.attr("dy", "1em").attr("class", "aText").text("Rate of Obesity (%)");

	chartGroup.append("text").attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
		.attr("class", "aText").text("Amount of Poor people (%)");
});