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

  $( "#selectarea" ).on('change',function(){
        $(".mainsr").hide();
      $("#"+$(this).val()).fadeIn(700);
  }).change();
//    switch tabs based on select value

   function openpopup(currelement){
    currelement.parentElement.children[1].classList.add("open-popup")
   }
   function closepopup(currelement){
    currelement.parentElement.classList.remove("open-popup");
   }
   function openpopup1(currelement){
    currelement.parentElement.children[3].classList.add("open-popup")
   }
   function closepopup1(currelement){
    currelement.parentElement.classList.remove("open-popup");
   }

   window.setTimeout(function() {
    $(".alert").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
    });
}, 3000);

function download(currelement){
    const todownload=currelement.parentElement;
    console.log(todownload);
    html2pdf().from(todownload).save();
}