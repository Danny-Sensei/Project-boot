/* ======================================
   MOBILE NAVIGATION
====================================== */

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector("#navbar");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");

});


/* ======================================
   CLOSE MENU WHEN LINK IS CLICKED
====================================== */

const navLinks = document.querySelectorAll("#navbar a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

    });

});


/* ======================================
   SMOOTH SCROLLING
====================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/* ======================================
   ACTIVE NAVBAR LINK
====================================== */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.clientHeight;

        if(scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active-link");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active-link");

        }

    });

});


/* ======================================
   HEADER SHADOW ON SCROLL
====================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.style.boxShadow =
        "0 4px 15px rgba(0,0,0,.12)";

    }

    else{

        header.style.boxShadow = "none";

    }

});


/* ======================================
   HERO IMAGE PARALLAX
====================================== */

const heroImage = document.querySelector(".hero-image img");

document.addEventListener("mousemove", (e)=>{

    if(heroImage){

        let x = (window.innerWidth / 2 - e.pageX) / 45;

        let y = (window.innerHeight / 2 - e.pageY) / 45;

        heroImage.style.transform =
        `translate(${x}px, ${y}px)`;

    }

});


/* ======================================
   CARD HOVER EFFECT
====================================== */

const cards = document.querySelectorAll(
".program-card, .feature, .detail-card"
);

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-10px) scale(1.02)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0px) scale(1)";

    });

});


/* ======================================
   SCROLL REVEAL ANIMATION
====================================== */

const revealElements = document.querySelectorAll(

".hero-content,.hero-image,.program-card,.feature,.detail-card,.register-box,.contact-grid"

);

function reveal(){

    revealElements.forEach(element=>{

        const windowHeight = window.innerHeight;

        const revealTop = element.getBoundingClientRect().top;

        const revealPoint = 120;

        if(revealTop < windowHeight - revealPoint){

            element.classList.add("show");

        }

    });

}

window.addEventListener("scroll", reveal);

reveal();


/* ======================================
   BUTTON RIPPLE EFFECT
====================================== */

const buttons = document.querySelectorAll("button");

buttons.forEach(button=>{

    button.addEventListener("click",function(e){

        const circle = document.createElement("span");

        const diameter = Math.max(

            this.clientWidth,

            this.clientHeight

        );

        circle.style.width = circle.style.height =

        `${diameter}px`;

        circle.style.left =

        `${e.clientX - this.offsetLeft - diameter/2}px`;

        circle.style.top =

        `${e.clientY - this.offsetTop - diameter/2}px`;

        circle.classList.add("ripple");

        const ripple = this.getElementsByClassName("ripple")[0];

        if(ripple){

            ripple.remove();

        }

        this.appendChild(circle);

    });

});


/* ======================================
   SCROLL TO TOP AFTER PAGE RELOAD
====================================== */

window.onbeforeunload = function(){

    window.scrollTo(0,0);

};