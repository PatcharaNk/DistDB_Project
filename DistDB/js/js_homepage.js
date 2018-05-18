var arr;
var DT_f_PHP;
var length;
var txt = readTextFile('game_block_detail.txt');
function readTextFile(file){   
    var allText="";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}

function init() {
    function reqListener() {
        console.log(this.responseText);
    }
    var oReq = new XMLHttpRequest();//new
    oReq.onload = function() {
        window['arr'] = this.responseText;
        window['DT_f_PHP'] = JSON.parse(arr);
        window['length'] = DT_f_PHP.length;
        DT_f_PHP=mergeSort(DT_f_PHP);
        insertValue(arr,DT_f_PHP,length);
    }
    oReq.open("get","index.php",true);
    oReq.send();
}

function insertValue(arr,DT_f_PHP,len) {
    var cvP1 = document.getElementById('coverPic1');
    var cvP2 = document.getElementById('coverPic2');
    var cvP3 = document.getElementById('coverPic3');
    var lcvp1 =document.getElementById('lcp1');
    var lcvp2 =document.getElementById('lcp2');
    var lcvp3 =document.getElementById('lcp3');
    cvP1.src = DT_f_PHP[len-1].URL_Pic;
    cvP2.src = DT_f_PHP[len-2].URL_Pic;
    cvP3.src = DT_f_PHP[len-3].URL_Pic;
    lcvp1.href='gamepage.html?'+DT_f_PHP[len-1].Name+"+"+DT_f_PHP[len-1].Platform;
    lcvp2.href='gamepage.html?'+DT_f_PHP[len-2].Name+"+"+DT_f_PHP[len-2].Platform;
    lcvp3.href='gamepage.html?'+DT_f_PHP[len-3].Name+"+"+DT_f_PHP[len-3].Platform;
    var game_panel = document.getElementById('game-panel');
    more = game_panel.innerHTML;
    game_panel.innerHTML = "";
    insertGameblock("1",DT_f_PHP[len-4]);
    insertGameblock("2",DT_f_PHP[len-5]);
    insertGameblock("3",DT_f_PHP[len-6]);
    insertGameblock("4",DT_f_PHP[len-7]);
    insertGameblock("5",DT_f_PHP[len-8]);
    insertGameblock("6",DT_f_PHP[len-9]);
    insertGameblock("7",DT_f_PHP[len-10]);
    insertGameblock("8",DT_f_PHP[len-11]);
    /*insertGameblock("9",DT_f_PHP[len-9]);
    insertGameblock("10",DT_f_PHP[len-10]);
    insertGameblock("11",DT_f_PHP[len-11]);
    insertGameblock("12",DT_f_PHP[len-12]);
    insertGameblock("13",DT_f_PHP[len-13]);
    insertGameblock("14",DT_f_PHP[len-14]);
    insertGameblock("15",DT_f_PHP[len-15]);
    insertGameblock("16",DT_f_PHP[len-16]);
    insertGameblock("17",DT_f_PHP[len-17]);
    insertGameblock("18",DT_f_PHP[len-18]);
    insertGameblock("19",DT_f_PHP[len-19]);
    insertGameblock("20",DT_f_PHP[len-20]);
    insertGameblock("21",DT_f_PHP[len-21]);*/ 
    game_panel.innerHTML=game_panel.innerHTML+more;
}

function insertGameblock(id,game_data){
    var l = game_data.Name+"+"+game_data.Platform;
    var game_panel = document.getElementById('game-panel');
    var before = game_panel.innerHTML;
    game_panel.innerHTML="";
    var e_block = document.createElement('div');
    e_block.setAttribute("class","col-sm-3 col-lg-3 col-md-3");
    e_block.setAttribute("id","game"+id);
    game_panel.appendChild(e_block);
    e_block.innerHTML=txt;
    var img = e_block.getElementsByTagName('img');
    img[0].setAttribute("id","pic"+id);
    img[0].src = game_data.URL_Pic;
    img[0].setAttribute('href','gamepage.html?'+l);
    var name = e_block.getElementsByTagName('h4')[0];
    var name_link = document.createElement('a');
    name_link.setAttribute('id','link'+id);

    name_link.setAttribute('href','gamepage.html?'+l);
    name_link.innerHTML = game_data.Name;
    name.appendChild(name_link);
    game_panel.innerHTML = before+game_panel.innerHTML;
}


function mergeSort(arr){
    if (arr.length < 2)
        return arr;
 
    var middle = parseInt(arr.length / 2);
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);
 
    return merge(mergeSort(left), mergeSort(right));
}
 
function merge(left, right)
{
    var result = [];
 
    while (left.length && right.length) {
        if (left[0]['User_Score'] <= right[0]['User_Score']) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
 
    while (left.length)
        result.push(left.shift());
 
    while (right.length)
        result.push(right.shift());
 
    return result;
}

function goto(id){
   var b = document.getElementById(id).innerHTML,
        url = 'http://gamepage.html?name=' + encodeURIComponent(b);
    document.location.href = url;
}