function btnone(currelement){
    let parent1=document.getElementById("lastname"); 
    let child1=parent1.children[0];
    let val1=child1.placeholder;

   if(currelement.value==="edit"){
    console.log(currelement.value);
   
     let swap1=document.createElement("input");
   
     swap1.type="text";
     swap1.placeholder=child1.textContent;
     swap1.value=child1.textContent;
     
     console.log(swap1);
     parent1.replaceChild(swap1,child1);
     currelement.value='save';
     currelement.style.backgroundImage = 'url(./images/pics/save.jpeg)';
   }
   else{
    currelement.value="edit";
    let psb1=currelement.previousElementSibling.value;
    let currval=document.createElement("span");
    
        console.log(psb1);
        console.log(psb1==="");
        if(psb1===""){
            console.log(val1);
            currval.textContent=val1;
        }
        else{
            currval.textContent=psb1;
        }
        currelement.style.backgroundImage = 'url(./images/pics/edit8.png)';
     parent1.replaceChild(currval,child1);
   }
}

// btn 2

function btntwo(currelement){
    let parent2=document.getElementById("firstname"); 
    let child2=parent2.children[0];
    let val2=child2.placeholder;

   if(currelement.value==="edit"){
    console.log(currelement.value);
    currelement.style.backgroundImage = 'url(./images/pics/save.jpeg)';
     let swap2=document.createElement("input");
   
     swap2.type="text";
     swap2.placeholder=child2.textContent;
     swap2.value=child2.textContent;
     
     console.log(swap2);
     parent2.replaceChild(swap2,child2);
     currelement.value='save';
   }
   else{
    currelement.value="edit";
    let psb2=currelement.previousElementSibling.value;
    let currval=document.createElement("span");
    
        console.log(psb2);
        console.log(psb2==="");
        if(psb2===""){
            console.log(val2);
            currval.textContent=val2;
        }
        else{
            currval.textContent=psb2;
        }
     currelement.style.backgroundImage = 'url(./images/pics/edit8.png)';
     parent2.replaceChild(currval,child2);
   
   }
}

//     btn 3

function btnthree(currelement){
    let parent3=document.getElementById("age"); 
    let child3=parent3.children[0];
    let val3=child3.placeholder;

   if(currelement.value==="edit"){
    console.log(currelement.value);
    currelement.style.backgroundImage = 'url(./images/pics/save.jpeg)';
     let swap3=document.createElement("input");
   
     swap3.type="number";
     swap3.placeholder=child3.textContent;
     swap3.value=child3.textContent;
     
     console.log(swap3);
     parent3.replaceChild(swap3,child3);
     currelement.value='save';
   }
   else{
    currelement.value="edit";
    let psb3=currelement.previousElementSibling.value;
    let currval=document.createElement("span");
    
        console.log(psb3);
        console.log(psb3==="");
        if(psb3===""){
            console.log(val3);
            currval.textContent=val3;
        }
        else{
            currval.textContent=psb3;
        }
        currelement.style.backgroundImage = 'url(./images/pics/edit8.png)';
     parent3.replaceChild(currval,child3);
   
   }
}

// btn4
function btnfour(currelement){
    let parent4=document.getElementById("dateofbirth"); 
    let child4=parent4.children[0];
    let val4=child4.placeholder;

   if(currelement.value==="edit"){
    console.log(currelement.value);
    currelement.style.backgroundImage = 'url(./images/pics/save.jpeg)';
     let swap4=document.createElement("input");
   
     swap4.type="date";
     swap4.placeholder=child4.textContent;
     swap4.value=child4.textContent;
     
     console.log(swap4);
     parent4.replaceChild(swap4,child4);
     currelement.value='save';
   }
   else{
    currelement.value="edit";
    let psb4=currelement.previousElementSibling.value;
    let currval=document.createElement("span");
    
        console.log(psb4);
        console.log(psb4==="");
        if(psb4===""){
            console.log(val4);
            currval.textContent=val4;
        }
        else{
            currval.textContent=psb4;
        }
        currelement.style.backgroundImage = 'url(./images/pics/edit8.png)';
     parent4.replaceChild(currval,child4);
   
   }
}

// btn5

function btnfive(currelement){
    console.log("enter5")
    let parent5=document.getElementById("gender"); 
    let child5=parent5.children[0];
    let val5=child5.placeholder;

   if(currelement.value==="edit"){
    console.log(currelement.value);
    currelement.style.backgroundImage = 'url(./images/pics/save.jpeg)';
     let swap5=document.createElement("select");
   
// 
let opt1=document.createElement("option");
       
       
      let opt2=document.createElement("option");
      opt2.value="Male";
      opt2.textContent="Male";
      swap5.appendChild(opt2);
      let opt3=document.createElement("option");
      opt3.value="Female";
      opt3.textContent="Female";
      swap5.appendChild(opt3);  
      
      let opt4=document.createElement("option");
      opt4.value="other";
      opt4.textContent="other";
      swap5.appendChild(opt4);
    
// 
     
     
     parent5.replaceChild(swap5,child5);
     currelement.value='save';
   }
   else{
    currelement.value="edit";
    let psb5=currelement.previousElementSibling.value;
    let currval=document.createElement("span");
    
        console.log(psb5);
        console.log(psb5==="none");
        if(psb5===""){
            console.log(val5);
            currval.textContent=val5;
        }
        else{
            currval.textContent=psb5;
        }
        currelement.style.backgroundImage = 'url(.images/pics/edit8.png)';
     parent5.replaceChild(currval,child5);
   
   }
}


//  btn 6   none



// btn7 email  none



function openpopup(currelement){
    currelement.parentElement.children[1].classList.add("open-popup")
   }
   function changepic(currelement){
     
    currelement.parentElement.classList.remove("open-popup");
    
   }

   function openpopup2(currelement){
    currelement.parentElement.children[1].classList.add("open-popup")
   }
   function closepopup(currelement){
     
    currelement.parentElement.classList.remove("open-popup");
    
   }
   window.setTimeout(function() {
    $(".alert").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
    });
}, 4000);
