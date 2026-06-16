const cards = document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.boxShadow="0px 15px 40px rgba(0,0,0,.15)";

});

card.addEventListener("mouseleave",()=>{

card.style.boxShadow="0px 5px 25px rgba(0,0,0,.05)";

});

});


const button=document.querySelector(".primary");

button.addEventListener("click",()=>{

window.scrollTo({

top:document.body.scrollHeight,

behavior:"smooth"

});

});