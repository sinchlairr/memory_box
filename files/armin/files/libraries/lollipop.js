var margin = {top: 30, right: 30, bottom: 70, left: 50},
            width = 380 ,
            height = 300 ;
        
        // append the svg object to the body of the page
        var svg = d3.select("#my_dataviz")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");
        d3.select("#my_dataviz").attr("align","right");
        
        // Initialize the X axis
        var x = d3.scaleBand()
          .range([ 0, width ])
          .padding(1);
        var xAxis = svg.append("g")
          .attr("transform", "translate(0," + height + ")")
        
        // Initialize the Y axis
        var y = d3.scaleLinear()
          .range([ height, 0]);
        var yAxis = svg.append("g")
          .attr("class", "myYaxis")
        
        
        // A function that create / update the plot for a given variable:
        function update(selectedVar) {
        
          // Parse the Data
          d3.csv("libraries/lollipop_data.csv", function(data) {
        
            // X axis
            x.domain(data.map(function(d) { return d.group; }))
            xAxis.transition().duration(1000).call(d3.axisBottom(x)).attr('stroke-width', '5px').attr('font-size', '15px').attr('font-weight', 'bold')
        
            // Add Y axis
            y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
            yAxis.transition().duration(1000).call(d3.axisLeft(y)).attr('stroke-width', '5px');
        
            // variable u: map data to existing circle
            var j = svg.selectAll(".myLine")
              .data(data)
            // update lines
            j
              .enter()
              .append("line")
              .attr("class", "myLine")
              .merge(j)
              .transition()
              .duration(1000)
                .attr("x1", function(d) { console.log(x(d.group)) ; return x(d.group); })
                .attr("x2", function(d) { return x(d.group); })
                .attr("y1", y(0))
                .attr("y2", function(d) { return y(d[selectedVar]); })
                .attr("stroke", "black")
        
        
            // variable u: map data to existing circle
            var u = svg.selectAll("circle")
              .data(data)
            // update bars
            u
              .enter()
              .append("circle")
              .merge(u)
              .transition()
              .duration(1000)
                .attr("cx", function(d) { return x(d.group); })
                .attr("cy", function(d) { return y(d[selectedVar]); })
                .attr("r", 8)
                .attr("fill", "brown");
        
        
          })
        
        }
        
        // Initialize plot
        update('var1');