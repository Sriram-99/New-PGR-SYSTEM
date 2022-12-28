

$("#topone").click(switchcenter1);
function switchcenter1(){
$("#center1").css("display","block");
$("#center2").css("display","none");
$(".defualt").css("display","block");
$(".center1main").css("display","none");
}
$("#toptwo").click(switchcenter2);
function switchcenter2(){
$("#center1").css("display","none");
$("#center2").css("display","block");
$(".defualt").css("display","block");
$(".center2main").css("display","none");
}
$(".click1").click(assbuttonclick);
function assbuttonclick(){
$(".center1main").css("display","block");
$("#center2").css("display","none");
$(".defualt").css("display","none");
}
$(".click2").click(accbuttonclick);
function accbuttonclick(){
$(".center2main").css("display","block");
$("#center1").css("display","none");
$(".defualt").css("display","none");
}

function openpopup(currelement){
    currelement.parentElement.children[1].classList.add("open-popup")
   }
   function closepopup(currelement){

    currelement.parentElement.classList.remove("open-popup");
   }
