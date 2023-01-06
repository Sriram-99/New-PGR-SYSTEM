function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
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

  imagesAreaFirstImage.style.marginLeft = `-${ 835.550* currentImageMinusOne}px`;
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


 


(function(){
  const fonts = ["bolder"];
  let captchaValue = "";
  function gencaptcha()
  {
      let value = btoa(Math.random()*1000000000);
      value = value.substr(0,5 + Math.random()*5);
      captchaValue = value;
  }

  function setcaptcha()
  {
      let html = captchaValue.split("").map((char)=>{
          const rotate = -20 + Math.trunc(Math.random()*30);
          const font = Math.trunc(Math.random()*fonts.length);
          return`<span
          style="
          transform:rotate(${rotate}deg);
          font-family:${font[font]};
          "
         >${char} </span>`;
      }).join("");
      document.querySelector(".tabcontent #captcha .preview").innerHTML = html;
  }

  function initCaptcha()
  {
      document.querySelector(".tabcontent #captcha .captcha_refersh").addEventListener("click",function(){
          gencaptcha();
          setcaptcha();
      });
      gencaptcha();
      setcaptcha();
  }
  initCaptcha();

  document.querySelector(".tabcontent .form_button").addEventListener("click",function(){
      let inputcaptchavalue = document.querySelector(".tabcontent #captcha .form_input_captcha").value;
      document.querySelector(".input").value=captchaValue;

      // if (inputcaptchavalue === captchaValue) 
      // {
      //     // swal("","Log in","success");
      //     alert("Log in success");
      // }else
      // {
      //     // swal("Invalid Captcha");
      //     alert("Invalid Captcha");
      // }
  });
})();