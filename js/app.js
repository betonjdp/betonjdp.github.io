document.getElementById("Color_radio").checked = true;
clickColor();

var coins_data = [
    { "A": 0, "B": 0, "C": 0 }];

var already_running = false;
var repetition;


function flip() {
    var random_choice = Math.floor(4 * Math.random());
    if (random_choice == 0) {
        document.getElementById("left_coin").src = "img/head.png";
        document.getElementById("right_coin").src = "img/head.png";
        coins_data.push({ "A": coins_data[coins_data.length - 1].A + 1,
                            "B": coins_data[coins_data.length - 1].B,
                            "C": coins_data[coins_data.length - 1].C });
    } 
    else if (random_choice < 3) {
        document.getElementById("left_coin").src = "img/head.png";
        document.getElementById("right_coin").src = "img/tail.png";
        coins_data.push({ "A": coins_data[coins_data.length - 1].A,
                            "B": coins_data[coins_data.length - 1].B + 1,
                            "C": coins_data[coins_data.length - 1].C });
    } 
    else {
        document.getElementById("left_coin").src = "img/tail.png";
        document.getElementById("right_coin").src = "img/tail.png";
        coins_data.push({ "A": coins_data[coins_data.length - 1].A,
                            "B": coins_data[coins_data.length - 1].B,
                            "C": coins_data[coins_data.length - 1].C + 1});
        }
}

function reset_data() {
  coins_data = [
    { "A": 0, "B": 0, "C": 0 }];
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
  //chart_update();
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
/*****************************************************************************************/
/*--------------------------------------ROULETTE-----------------------------------------*/
/*****************************************************************************************/
var rSoldi_vinti = 0;
var rSoldi_scommessi = 0;
var rScommessa = 0;
var r_repetition;
var already_r_running= false;
function clickColor(){
    document.getElementById("selcol").disabled = false;
    document.getElementById("selpar").disabled = true;
    document.getElementById("selmanque").disabled = true;

}
function clickPar(){
    document.getElementById("selpar").disabled = false;
    document.getElementById("selcol").disabled = true;
    document.getElementById("selmanque").disabled = true;

}
function clickManque(){
    document.getElementById("selmanque").disabled = false;
    document.getElementById("selpar").disabled = true;
    document.getElementById("selcol").disabled = true;

}

function roulette_spin(){
    var number = Math.floor(Math.random() * 37);
    var rScommessa = parseInt(document.getElementById("selscom").value);
    var selcol = document.getElementById("selcol");
    var selpar = document.getElementById("selpar");
    var selmanque =  document.getElementById("selmanque");
    var numberS = document.getElementById("NumberS");
    var color;
    rSoldi_scommessi += rScommessa;
    if (selcol.disabled == false
        && selpar.disabled == false
        && selmanque.disabled == false) {return}
    if(number == 0){
        numberS.innerHTML = "0";
        numberS.style.backgroundColor = "#228B22";
        color = 0;
    }
    else if((((((number %100 - (number%10))/10)+ (number%10)) %2) == 0) || number == 10 || number == 28){
        numberS.innerHTML = number;
        numberS.style.backgroundColor = "#000000";
        color = -1;
    }
    else {
        numberS.innerHTML = number;
        numberS.style.backgroundColor = "#B20000";
        color = 1;
    }
     
    if(selcol.disabled == false) {
        if(selcol.value == "Nero") {
            if(color == -1)
                rSoldi_vinti += rScommessa*2;
        }
        else {
            if(color == 1)
                rSoldi_vinti += rScommessa*2;
        }
    }
                
    else if (selpar.disabled == false){
        if(selpar.value == "Pari") {
            if (number %2 == 0 && number != 0)
                rSoldi_vinti += rScommessa*2;
        }
        else {
                if (number %2 == 1)
                    rSoldi_vinti += rScommessa*2;
        }
    }
    else if(selmanque.disabled == false)
        if(selmanque.value == "Numeri 1-18") {
            if (number <= 18 && number != 0)
                rSoldi_vinti += rScommessa*2;
        }
        else {
            if (number >= 19)
                rSoldi_vinti += rScommessa*2;
        }
    document.getElementById("counterSP").innerHTML = rSoldi_scommessi;
    document.getElementById("counterSV").innerHTML = rSoldi_vinti;
    document.getElementById("counterSL").innerHTML = rSoldi_scommessi-rSoldi_vinti;
}
function reset_r(){
    rSoldi_scommessi = rSoldi_vinti = rScommessa = 0;
    document.getElementById("counterSP").innerHTML = 0;
    document.getElementById("counterSV").innerHTML = 0;
    document.getElementById("counterSL").innerHTML = 0;
}

function multiple_r_spin(){
    if (already_r_running==true) {
        document.getElementById("multiple_spin_button").innerHTML = "Molti lanci";
        document.getElementById("multiple_spin_button").className = "btn btn-default";
        already_r_running = false;
        window.clearInterval(r_repetition);
    }
    else {
        document.getElementById("multiple_spin_button").innerHTML = "Interrompi";
        document.getElementById("multiple_spin_button").className = "btn btn-warning";
        already_r_running = true;
        r_repetition = window.setInterval(roulette_spin, 10);
    }
}
