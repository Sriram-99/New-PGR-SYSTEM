function openPage(pageName, elmnt, color) {
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
document.getElementById("defaultOpen").click();

let imagesAreaImages = document.querySelectorAll('.images-area img');
 let imagesAreaFirstImage = document.querySelector('.images-area .firstImage');

 let previousBtn = document.querySelector('.previous-btn');
 let nextBtn = document.querySelector('.next-btn');

 let paginationArea = document.querySelector('.pagination-area');

 let currentImageCount = 1;

 let sliderController;
 let createPaginationSpans;

 previousBtn.addEventListener('click', previousImage);
 nextBtn.addEventListener('click', nextImage);
 function previousImage() {
  if(currentImageCount === 1){
    return false;
  }else{
    currentImageCount--;
    sliderController();

  };
};
function nextImage() {
  if(currentImageCount === imagesAreaImages.length){
    return false;
  }else{
    currentImageCount++;
    sliderController();
  };
};
(function createPaginationSpans(){
  for(var i = 0; i < imagesAreaImages.length; i++){
    let paginationSpan = document.createElement('span');
    paginationArea.appendChild(paginationSpan)
  };
})();
(sliderController = function (){
  let paginationCircls = document.querySelectorAll('.pagination-area span');

  removeAllActive(paginationCircls);

  activeButton();

  let currentImageMinusOne = currentImageCount - 1;

  paginationCircls[currentImageMinusOne].classList.add('active');

  imagesAreaFirstImage.style.marginLeft = `-${600 * currentImageMinusOne}px`;
  console.log(600 * currentImageMinusOne);
})();

function removeAllActive(targetElement){
  for(var i = 0; i < targetElement.length; i++){
    targetElement[i].classList.remove('active');
  };
};
function activeButton() {
  currentImageCount === 1
  previousBtn.classList.add('disabled') ;
  previousBtn.classList.remove('disabled');

  currentImageCount === imagesAreaImages.length ?
  nextBtn.classList.add('disabled') :
  nextBtn.classList.remove('disabled');
};

setInterval(() => {
  if(currentImageCount != imagesAreaImages.length){
    currentImageCount++;
    sliderController();
  }else{
    currentImageCount = 1;
    sliderController();
  };
}, 3000);



// document.querySelector(".form > div.w0.pr.ln3.p16.remember")

(function(){
  // const fonts = ["cursive","sans-serif","serif","monospace"];
  const fonts=["bolder"];
  let captchaValue = "";
  function generateCaptcha(){
    let value = btoa(Math.random()*1000000000);
    value = value.substr(0,5+Math.random()*5);
    captchaValue = value;
  }
  function setCaptcha(){
    let html = captchaValue.split("").map((char)=>{
      const rotate = -20 + Math.trunc(Math.random()*30);
      const font = Math.trunc(Math.random()*fonts.length);
      return `<span 
        style="
          transform:rotate(${rotate}deg);
          font-family:${fonts[font]}
        "
      >${char}</span>`;
    }).join("");
    document.querySelector(".login-form .captcha .preview").innerHTML = html;
  }
  function initCaptcha(){
    document.querySelector(".login-form .captcha .captcha-refresh").addEventListener("click",function(){
      generateCaptcha();
      setCaptcha();
    });
    generateCaptcha();
    setCaptcha();
  }
  initCaptcha();
  
  document.querySelector(".login-form #login-btn").addEventListener("click",function(){
    let inputCaptchaValue = document.querySelector(".login-form .captcha input").value;
    if(inputCaptchaValue === captchaValue){
      swal("", "Logging In!", "success");
    } else {
      swal("Invalid captcha");
    }
  });
})();




//  function reset(){
//    location.reload();
//  }
//  function generate(){

//    let num = '1234567890';
//    let OTP = '';

//    for(let i=0;i<4;i++){

//      OTP += num[Math.floor(Math.random()*10)];

//    }
//  alert('  Dear Customer , your OTP for registration is '+OTP);
//  }


window.setTimeout(function() {
  $(".alert").fadeTo(500, 0).slideUp(500, function(){
      $(this).remove(); 
  });
}, 3000);