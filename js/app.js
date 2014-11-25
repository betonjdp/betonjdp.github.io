var coins_data = [
    { "A":0, "B":0, "C":0 }];

var already_running = false;
var repetition = undefined;

function flip() {
    random_choice = Math.floor(4 * Math.random( ));
    if (random_choice == 0){
        document.getElementById("left_coin").src = "img/head.png";
        document.getElementById("right_coin").src = "img/head.png";
        coins_data.push({ "A":coins_data[coins_data.length - 1].A + 1,
                            "B":coins_data[coins_data.length - 1].B,
                            "C":coins_data[coins_data.length - 1].C });
        }
    else if (random_choice < 3) {
        document.getElementById("left_coin").src = "img/head.png";
        document.getElementById("right_coin").src = "img/tail.png";
        coins_data.push({ "A":coins_data[coins_data.length - 1].A,
                            "B":coins_data[coins_data.length - 1].B + 1,
                            "C":coins_data[coins_data.length - 1].C });
        }
    else {
        document.getElementById("left_coin").src = "img/tail.png";
        document.getElementById("right_coin").src = "img/tail.png";
        coins_data.push({ "A":coins_data[coins_data.length - 1].A,
                            "B":coins_data[coins_data.length - 1].B,
                            "C":coins_data[coins_data.length - 1].C + 2});
        }
    }
    
function reset_data() {
  coins_data = [
    { "A":0, "B":0, "C":0 }];
  }
  
function single_flip() {
  flip();
  update_counters();
  updateCoinsBarchart();
  }

function multiple_flip() {
  if (already_running==true) {
    document.getElementById("multiple_button").innerHTML = "Molti lanci";
    document.getElementById("multiple_button").className = "btn btn-default";
    already_running = false;
    window.clearInterval(repetition);
    }
  else {
    document.getElementById("multiple_button").innerHTML = "Interrompi";
    document.getElementById("multiple_button").className = "btn btn-warning";
    already_running = true;
    repetition = window.setInterval(single_flip, 500);
    }
  }

function reset() {
  reset_data();
  update_counters();
  update_charts();
  }

function updateCoinsBarchart() {
  chart = d3.select("#coins-barchart");
  width = chart.node()
  chart.selectAll("p").remove();
  chart.selectAll("svg")
       .data([0])
       .enter()
       .append("svg")
         .attr("width", 400)
         .attr("height", 300);
  }

function chart_update(a, b, c) {
		var data = [a, b, c];

		var x = d3.scale.linear()
		    .domain([0, d3.max(data)])
		    .range([0, 420]);
		
		d3.select(".chart")
		  .selectAll("div")
		  .data(data)
		  .enter().append("div")
		  .style("width", function(d) { return x(d) + "px"; })
		  .text(function(d) { return d; });
		
		d3.select(".chart")
		  .selectAll("div")
		  .data(data)
		  .style("width", function(d) { return x(d) + "px"; })
		  .text(function(d) { return d; });
}

function update_counters(){	  
    document.getElementById("counterHH").innerHTML = coins_data[coins_data.length - 1].A;
    document.getElementById("counterHT").innerHTML = coins_data[coins_data.length - 1].B;
    document.getElementById("counterTT").innerHTML = coins_data[coins_data.length - 1].C;
}
