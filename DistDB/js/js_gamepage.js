var href = document.location.href;
var link = href.split('?');
var plat = link[1].split('+');
var game_name = decodeURI(plat[0]);
var game_platform = decodeURI(plat[1]);
var h1 = document.getElementById('gamename');
var title = document.getElementsByTagName('title');
title[0].innerHTML = game_name;
h1.innerHTML=game_name;
search(game_name,game_platform);
function search(name,plat){
    filter = name+"!!"+plat;
    if (filter.length == 0) { 
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var alltxt = this.responseText;
                var data = JSON.parse(alltxt);
                changeDetail(data[0]);
            }
        };
        xmlhttp.open("GET", "Find.php?q="+filter, true);
        xmlhttp.send();
    }
    
}

function changeDetail(data){
    var pic = document.getElementById('gamepic');
    var vid = document.getElementById('cartoonVideo');
    var about = document.getElementById('gameabout');
    pic.src = data.URL_Pic;
    vid.src = data.URL_Trailer;
    about.innerHTML = data.About;
    var heightGB = document.getElementById("heightGB");
    var heightNA = document.getElementById("heightNA");
    var heightEU = document.getElementById("heightEU");
    var heightJP = document.getElementById("heightJP");
    var heightOther = document.getElementById("heightOther");
    var score_Cir = document.getElementById("score-circle");
    var score = document.getElementById("score");
    "height: 111px;"
    var contH = 236/8;
    heightGB.style = "height:"+(Math.ceil(data.Global_Sales*contH)).toString()+"px;";
    heightNA.style = "height:"+(Math.ceil(data.NA_Sales*contH)).toString()+"px;";
    heightEU.style = "height:"+(Math.ceil(data.EU_Sales*contH)).toString()+"px;";
    heightJP.style = "height:"+(Math.ceil(data.JP_Sales*contH)).toString()+"px;";
    heightOther.style = "height:"+(Math.ceil(data.Other_Sales*contH)).toString()+"px;";
    var sc = (data.User_Score).toFixed(1);
    score_Cir.className = "c100 p"+(sc*10).toString();
    score.innerHTML = sc;
}

function clickScore() {
    filter = game_name+'!!'+game_platform;
    if (filter.length == 0) { 
        return;
    } else {
        var alltxt;
        var DT_f_PHP;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alltxt = this.responseText;
                DT_f_PHP = JSON.parse(alltxt);
                updateScore(DT_f_PHP[0]);
            }
        };
        xmlhttp.open("GET", "updateDB.php?q="+filter, true);
        xmlhttp.send();
    }
}

function updateScore(game_data){
    var clickedSC = $('input[name="star"]:checked').val();
    var oldSc = game_data.User_Score;
    var numUser = game_data.User_Count;
    var newUser = game_data.User_Count+1;
    var newSc = (((oldSc*numUser)+(clickedSC*2))/(newUser));
//    alert(newSc);
    var filter =game_data.Name+"!!"+game_data.Platform+"!!"+newSc+"!!"+newUser;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","updateSc.php?q="+filter,true);
    xmlhttp.send();
    window.location.assign('gamepage.html?'+game_data.Name+'+'+game_data.Platform);
}




