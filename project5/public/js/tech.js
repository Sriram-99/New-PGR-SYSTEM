
$("#topone").click(switchcenter1);
function switchcenter1(){
$(".center1").css("display","block");
$(".center2").css("display","none");
}


$("#toptwo").click(switchcenter2);
function switchcenter2(){
$(".center1").css("display","none");
$(".center2").css("display","block");
}

function openpopup(currelement){
    let val=currelement.parentElement.parentElement.length;
    var numChildren = $('#ulcenter1').children().length;
    console.log(numChildren); 
    for(let i=0;i<numChildren;i++){
        currelement.parentElement.parentElement.children[i].children[0].classList.remove("active1");
        currelement.parentElement.parentElement.children[i].children[1].classList.remove("open-popup");
    }
    currelement.parentElement.children[1].classList.add("open-popup");
    currelement.parentElement.children[0].classList.add("active1");
   }
   function closepopup(currelement){
    
    currelement.parentElement.classList.remove("close");
    currelement.parentElement.classList.remove("open-popup");
   }
   function openpopup2(currelement){
    let val=currelement.parentElement.parentElement.length;
    var numChildren = $('#ulcenter2').children().length;
    console.log(numChildren); 
    for(let i=0;i<numChildren;i++){
        currelement.parentElement.parentElement.children[i].children[0].classList.remove("active2");
        currelement.parentElement.parentElement.children[i].children[1].classList.remove("open-popup");
    }
    currelement.parentElement.children[1].classList.add("open-popup");
    currelement.parentElement.children[0].classList.add("active2");
   }
   function closepopup(currelement){
    
    currelement.parentElement.classList.remove("close");
    currelement.parentElement.classList.remove("open-popup");
   }
   
   window.setTimeout(function() {
    $(".alert").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
    });
}, 4000);