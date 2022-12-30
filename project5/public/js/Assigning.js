// for greviance and employee
function openPage(pageName,elmnt,color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
// for greviance and employee end




//electrical mechanical (departments) Start
 function openCity(evt, cityName) {
  var i, tablecontent, tablelinks;
  tablecontent = document.getElementsByClassName("tablecontent");
  for (i = 0; i < tablecontent.length; i++) {
    tablecontent[i].style.display = "none";
  }
  tablelinks = document.getElementsByClassName("tablelinks");
  for (i = 0; i < tablelinks.length; i++) {
    tablelinks[i].className = tablelinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultopen" and click on it
document.getElementById("defaultopen").click();
//electrical mechanical (departments) end



//Assigned and unassigned complaints Start
 function openCty(evt, cityName) {
  var i, tabecontent, tabeinks;
  tabecontent = document.getElementsByClassName("tabecontent");
  for (i = 0; i < tabecontent.length; i++) {
    tabecontent[i].style.display = "none";
  }
  tabelinks = document.getElementsByClassName("tabelinks");
  for (i = 0; i < tabelinks.length; i++) {
    tabelinks[i].className = tabelinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
//Assigned and unassigned complaints end
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultpen").click();
// Assigned and unassigned complaints Start end






// popup form start
function openpopup(currelement){
    currelement.parentElement.children[1].classList.add("open-popup")
   }
   function closepopup(currelement){

    currelement.parentElement.classList.remove("open-popup");
   }
// popup form end


window.setTimeout(function() {
  $(".alert").fadeTo(500, 0).slideUp(500, function(){
      $(this).remove(); 
  });
}, 4000);















   // function myFunction() {
   //   document.getElementById("myDropdown").classList.toggle("show");
   // }
   // function mFunction() {
   //     document.getElementById("Dropdown").classList.toggle("show");
   // }
   // // Close the dropdown if the user clicks outside of it
   // window.onclick = function(e) {
   //   if (!e.target.matches('.dropbtn')) {
   //   var myDropdown = document.getElementById("myDropdown");
   //     // if (myDropdown.classList.contains('show')) {
   //     //   myDropdown.classList.remove('show');
   //     // }
   //   }
   // }
   // document.getElementById("departments").click();