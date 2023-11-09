var margin = {top: 30, right: 10, bottom: 10, left: 10},
        width = 2000 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

var x = d3.scalePoint().rangeRound([0, width]).padding(1),
    y = {},
    dragging = {};


var line = d3.line(),
    //axis = d3.axisLeft(x),
    background,
    foreground,
    extents;


var container = d3.select("body").append("div")
    .attr("class", "parcoords")
    .style("width", width + margin.left + margin.right + "px")
    .style("height", height + margin.top + margin.bottom + "px");

var svg = container.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g") // This is basically adding a <g> (group) element as a child of SVG.
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var quant_p = function(v){
    return (parseFloat(v) == v) || (v == "")
};     
// The quant_p function returns true if either of these conditions is met, which means that it considers v to be a quantitative (numeric) value or an empty string. 
// It returns false if v is neither a numeric string nor an empty string.
var dimensions;
// In practice, this function might be used to filter or 
// validate values in a dataset or perform data processing tasks where you need to differentiate between quantitative values and non-quantitative values (e.g., strings, non-numeric data).
d3.json("SubstanceAbuse_data.json", function(error, accidents) {

    const color = d3.scaleOrdinal()
      .domain(["MID NIGHT", "MORNING", "NIGHT","AFTERNOON"])
      .range([ "orange", "green", "red","blue"])
    
      dimensions = d3.keys(accidents[0]).filter(function (d) {
        return d !== "CRASH_DAYTIME";
    });
    x.domain(dimensions);

    dimensions.forEach(function(d) {
        var vals = accidents.map(function(p) {return p[d];}); // all values for that dimension will be present in vals.
        console.log(vals)
        if (vals.every(quant_p)){ 
        y[d] = d3.scaleLinear()
            .domain(d3.extent(accidents, function(p) { 
                return +p[d]; }))
            .range([height, 0])
        }
        else{
        vals.sort();           
        y[d] = d3.scalePoint()
                .domain(vals.filter(function(v, i) {return vals.indexOf(v) == i;}))
                .range([height, 0],1);
        }
        
})


extents = dimensions.map(function(p) { return [0,0]; });
// For each dimension, it returns an array [0, 0]. This array essentially represents the extent or range for that dimension.

// The first element (0) can be thought of as the minimum value for that dimension.
// The second element (0) can be thought of as the maximum value for that dimension.


// Add blue foreground lines for focus.
foreground = svg.append("g")
    .attr("class", "foreground")
    .selectAll("path")
    .data(accidents)
    .enter().append("path")
    .style("stroke", function (d) { 
        
        return color(d["CRASH_DAYTIME"]); })
    .attr("d", path);



// Add a group element for each dimension.

var g = svg.selectAll(".dimension")
    .data(dimensions)
    .enter().append("g")
    .attr("class", "dimension")
    .attr("transform", function(d) {  return "translate(" + x(d) + ")"; })
    .call(d3.drag()
        .subject(function(d) { return {x: x(d)}; })
        .on("start", function(d) {
        dragging[d] = x(d);
        background.attr("visibility", "hidden");
        })
        .on("drag", function(d) {
        dragging[d] = Math.min(width, Math.max(0, d3.event.x));
        foreground.attr("d", path);
        dimensions.sort(function(a, b) { return position(a) - position(b); });
        x.domain(dimensions);
        g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
        })
        .on("end", function(d) {
        delete dragging[d];
        transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
        transition(foreground).attr("d", path);
        background
            .attr("d", path)
            .transition()
            .delay(500)
            .duration(0)
            .attr("visibility", null);
        }));


// Add an axis and title.
var g = svg.selectAll(".dimension");
g.append("g")
    .attr("class", "axis")
    .each(function(d) {  d3.select(this).call(d3.axisLeft(y[d]));})
    //text does not show up because previous line breaks somehow
    .append("text")
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .attr("y", -9) 
    .text(function(d) { return d; });

// Add and store a brush for each axis.
g.append("g")
    .attr("class", "brush")
    .each(function(d) {
        if(y[d].name == 'r'){
        // console.log(this);

        d3.select(this).call(y[d].brush = d3.brushY().extent([[-8, 0], [8,height]]).on("start", brushstart).on("brush", brush_parallel_chart));
        }
        })
    .selectAll("rect")
    .attr("x", -8)
    .attr("width", 16);  
});  // closing

function position(d) {
var v = dragging[d];
return v == null ? x(d) : v;
}

function transition(g) {
return g.transition().duration(500);
}

// Returns the path for a given data point.
function path(d) {
return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
}


// brush start function
function brushstart() {
d3.event.sourceEvent.stopPropagation();
}


// Handles a brush event, toggling the display of foreground lines.
function brush_parallel_chart() {

    for(var i=0;i<dimensions.length;++i){

            if(d3.event.target==y[dimensions[i]].brush) {
                extents[i]=d3.event.selection.map(y[dimensions[i]].invert,y[dimensions[i]]);
                }
    }

    foreground.style("display", function(d) {
        return dimensions.every(function(p, i) {
            if(extents[i][0]==0 && extents[i][0]==0) {
                return true;
            }
        return extents[i][1] <= d[p] && d[p] <= extents[i][0];
        }) ? null : "none";
    }); 
}


document.body.insertAdjacentHTML('beforeend', `
    <div id="legend" class="legend">
    <h2>Label</h2>
        <div class="legend-item">
            <div class="legend-color" style="background-color: orange;"></div>
            <div>MID NIGHT</div>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: green;"></div>
            <div>MORNING</div>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: red;"></div>
            <div>NIGHT</div>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: blue;"></div>
            <div>AFTERNOON</div>
        </div>
    </div>
`);

// Append the CSS styles to the head of your webpage
const style = document.createElement('style');
style.innerHTML = `
    .legend {
        position: absolute;
        top: 520px;
        right: 20px;
        background: white;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 5px;
        z-index: 1000;
    }

    .legend-item {
        margin-bottom: 5px;
    }

    .legend-color {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }
    /* Add more CSS styles as needed */
`;

document.head.appendChild(style);
