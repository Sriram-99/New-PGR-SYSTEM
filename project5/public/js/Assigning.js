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


function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
function mFunction() {
    document.getElementById("Dropdown").classList.toggle("show");
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
  var myDropdown = document.getElementById("myDropdown");
    // if (myDropdown.classList.contains('show')) {
    //   myDropdown.classList.remove('show');
    // }
  }
}
document.getElementById("departments").click();

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

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultopen").click();

function openpopup(currelement){
    currelement.parentElement.children[1].classList.add("open-popup")
   }
   function closepopup(currelement){

    currelement.parentElement.classList.remove("open-popup");
   }
