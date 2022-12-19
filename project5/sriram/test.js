$("#button1").click(switchmain1);
function switchmain1(){
    $("#main1").css("display","block");
    $("#main2").css("display","none");
    
}
$("#button2").click(swithchmain2)
function swithchmain2(){
  
    $("#main1").css("display","none");
    $("#main2").css("display","block");
}

$("#topone").click(switchcenter1);
function switchcenter1(){
$(".center1").css("display","block");
$(".center2").css("display","none")
}


$("#toptwo").click(switchcenter2);
function switchcenter2(){
$(".center1").css("display","none");
$(".center2").css("display","block")
}
$("#submit").click(msgsubmit);
function msgsubmit(){
    alert("Complaint has been submitted successfully")
}




// submit and insertion of values

let toiletsary=["complaint regarding cleanliness","complaint regarding leakage of water","complaint regarding the free usage of public toilets"];
let breadkdownary=["regarding failure of light","regarding failure of computer","regarding failure of ac","other"];
let garbage=["Absenteeism of sweepers","broken bin","burning of garding",""]