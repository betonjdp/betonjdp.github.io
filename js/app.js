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
  updateCoinsLinechart();
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
        repetition = window.setInterval(single_flip, 400);
    }
  }

function reset() {
  reset_data();
  update_counters();
  //chart_update();
}
function updateCoinsBarchart() {
  if ($("#coins-barchart").has("svg").length < 1) {
    $("#coins-barchart").append("<svg width='400' height='300' style='background:#ddd;'><rect x='50' y='299' width='90' height='1' style='fill:red;'>Yo</rect><rect x='155' y='299' width='90' height='1' style='fill:yellow;'></rect><rect x='260' y='299' width='90' height='1' style='fill:green;'></rect><text x='80' y='296'>Aldo</text><text x='180' y='296'>Bruno</text><text x='285' y='296'>Carlo</text></svg>");
    }
  A = coins_data[coins_data.length - 1]["A"];
  B = coins_data[coins_data.length - 1]["B"];
  C = coins_data[coins_data.length - 1]["C"];
  total = A + B + C;
  hA = 1 + 300 * A / total;
  hB = 1 + 300 * B / total;
  hC = 1 + 300 * C / total;
  $("#coins-barchart svg [x='50']").attr("y", 280-hA);
  $("#coins-barchart svg [x='50']").attr("height", hA);
  $("#coins-barchart svg [x=155]").attr("y", 280-hB);
  $("#coins-barchart svg [x=155]").attr("height", hB);
  $("#coins-barchart svg [x=260]").attr("y", 280-hC);
  $("#coins-barchart svg [x=260]").attr("height", hC);
}


function updateCoinsLinechart() {
  if ($("#coins-linechart").has("svg").length < 1) {
    $("#coins-linechart").append('<svg height="300" width="400" style="background:#ddd;"><polyline id="alinea" points="10,290" style="fill:none;stroke:red;stroke-width:2"></polyline><polyline id="blinea" style="fill:none;stroke:yellow;stroke-width:2" points="10,290"></polyline><polyline id="clinea" style="fill:none;stroke:green;stroke-width:2" points="10,290"></polyline><polyline id="xaxis" style="fill:none;stroke:#111;stroke-width:2" points="0,290 400,290 390,300 390,280 400,290"></polyline><polyline id="yaxis" style="fill:none;stroke:#111;stroke-width:2" points="10,300 10,0 0,10 20,10 10,0"></polyline></svg>');

    }
  A = 290 - coins_data[coins_data.length - 1]["A"];
  B = 290 - coins_data[coins_data.length - 1]["B"];
  C = 290 - coins_data[coins_data.length - 1]["C"];
  
  $("#coins-linechart #alinea").attr('points', $("#coins-linechart #alinea").attr('points') + ' ' + ( 10 + coins_data.length) + ',' + A);
  $("#coins-linechart #blinea").attr('points', $("#coins-linechart #blinea").attr('points') + ' ' + ( 10 + coins_data.length) + ',' + B);
  $("#coins-linechart #clinea").attr('points', $("#coins-linechart #clinea").attr('points') + ' ' + ( 10 + coins_data.length) + ',' + C);
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


/*****************************************************************************************/
/*-----------------------------------GRATTA E PERDI--------------------------------------*/
/*****************************************************************************************/
function setMask4(){
  $("#mask").attr('xlink:href', "img/mask4.png");
}
function setMask3(){
  $("#mask").attr('xlink:href', "img/mask3.png");
}
function setMask2(){
  $("#mask").attr('xlink:href', "img/mask2.png");
}
function setMask1(){
  $("#mask").attr('xlink:href', "img/mask1.png");
}
function setMask0(){
  $("#mask").attr('xlink:href', "img/mask0.png");
}
var gep_spesi = 1;
var gep_vinti = 0;
var gep_premio = 1;
var gep_grattato = false;
var gep_already_running = false;
var gep_premi = [ ["img/zero.png", 1, 0],
                  ["img/uno.png", 2.5, 1],
                  ["img/cinque.png", 20, 5],
                  ["img/dieci.png", 40, 10],
                  ["img/cinquanta.png", 200, 50],
                  ["img/cento.png", 400, 100],
                  ["img/cinquecento.png", 2000, 500],
                  ["img/mille.png", 4000, 1000],
                  ["img/5K.png", 20000, 5000],
                  ["img/10K.png", 40000, 10000],
                  ["img/50K.png", 200000, 50000],
                  ["img/100K.png", 400000, 100000],
                  ["img/1000K.png", 4000000, 1000000]]


function gratta_gep(){
  if (gep_grattato == true) {
    return false;
  }
  gep_grattato = true;
  window.setTimeout("setMask3();", 300);
  window.setTimeout("setMask2();", 550);
  window.setTimeout("setMask1();", 750);
  window.setTimeout("setMask0();", 900);
  
  gep_vinti += gep_premio;
  update_gep_counters();
}

function fast_gep(){
  if (gep_grattato == true) {
    new_gep();
    return false;
  }
  gep_grattato = true;
  window.setTimeout("setMask3();", 30);
  window.setTimeout("setMask2();", 55);
  window.setTimeout("setMask1();", 75);
  window.setTimeout("setMask0();", 90);
  
  gep_vinti += gep_premio;
  update_gep_counters();
}

function new_gep(){
  if (gep_grattato == false) {
    return false;
  }
  gep_grattato = false;
  setMask4();
  gep_spesi += 1;
  
  value = Math.random();
  for (i in gep_premi) {
    if (value < 1/gep_premi[i][1]) {
      gep_premio = gep_premi[i][2];
      $("#prize").attr('xlink:href', gep_premi[i][0]);
    }
  }
  update_gep_counters();
}

function many_gep() {
  if (gep_already_running==true) {
    $("#gep_multiple_button").html("Gratta in sequenza");
    $("#gep_multiple_button").toggleClass("btn-default");
    $("#gep_multiple_button").toggleClass("btn-warning");
    gep_already_running = false;
    window.clearInterval(gep_repetition);
    }
  else {
        $("#gep_multiple_button").html("Interrompi");
        $("#gep_multiple_button").toggleClass("btn-default");
        $("#gep_multiple_button").toggleClass("btn-warning");
        gep_already_running = true;
        gep_repetition = window.setInterval(fast_gep, 150);
    }
  }

function update_gep_counters(){
  $("#counter_gep_spesi").html(gep_spesi);
  $("#counter_gep_vinti").html(gep_vinti);
}
