const menuBtn = document.querySelector(".menu-btn");

const mobileNav = document.querySelector(".mobile-nav");

const header = document.querySelector(".header");

const navLinks = document.querySelectorAll(".mobile-nav a");

const heroImage = document.querySelector(".hero-image img");

const scrollTopBtn = document.querySelector(".scroll-top");

/* ==========================================================
   MOBILE MENU
========================================================== */

if(menuBtn && mobileNav){

    menuBtn.addEventListener("click",()=>{

        mobileNav.classList.toggle("active");

        menuBtn.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if(icon){

            if(mobileNav.classList.contains("active")){

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            }

            else{

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        }

    });

}

/* ==========================================================
   CLOSE MENU AFTER CLICKING A LINK
========================================================== */

navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        mobileNav.classList.remove("active");

        menuBtn.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        if(icon){

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

});

/* ==========================================================
   SMOOTH SCROLL
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target = document.querySelector(

            this.getAttribute("href")

        );

        if(target){

            const headerHeight = header.offsetHeight;

            const targetPosition =

                target.offsetTop - headerHeight;

            window.scrollTo({

                top:targetPosition,

                behavior:"smooth"

            });

        }

    });

});

/* ==========================================================
   STICKY HEADER
========================================================== */

window.addEventListener("scroll",()=>{

    if(window.scrollY > 40){

        header.classList.add("scrolled");

    }

    else{

        header.classList.remove("scrolled");

    }

});

/* ==========================================================
   ACTIVE NAVIGATION LINK
========================================================== */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

    let currentSection = "";

    sections.forEach(section=>{

        const sectionTop =

            section.offsetTop - 180;

        const sectionHeight =

            section.offsetHeight;

        if(window.scrollY >= sectionTop){

            currentSection =

                section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active-link");

        if(

            link.getAttribute("href")

            === "#" + currentSection

        ){

            link.classList.add("active-link");

        }

    });

});

/* ==========================================================
   SCROLL TO TOP BUTTON
========================================================== */

if(scrollTopBtn){

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 500){

            scrollTopBtn.classList.add("show");

        }

        else{

            scrollTopBtn.classList.remove("show");

        }

    });

    scrollTopBtn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* ==========================================================
   HERO IMAGE FLOAT EFFECT
========================================================== */

if(heroImage){

    document.addEventListener("mousemove",(e)=>{

        const x =

            (window.innerWidth / 2 - e.clientX) / 45;

        const y =

            (window.innerHeight / 2 - e.clientY) / 45;

        heroImage.style.transform =

            `translate(${x}px, ${y}px)`;

    });

}

/* ==========================================================
   RESET SCROLL ON PAGE RELOAD
========================================================== */

window.onbeforeunload = function(){

    window.scrollTo(0,0);

};

/* ==========================================================
   SCROLL REVEAL ANIMATION
========================================================== */

const revealElements = document.querySelectorAll(

    ".section-heading, .why-card, .course-card, .stat-card, .detail-card, .contact-card, .registration-form"

);

function revealOnScroll(){

    const trigger = window.innerHeight - 120;

    revealElements.forEach(element=>{

        const top = element.getBoundingClientRect().top;

        if(top < trigger){

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/* ==========================================================
   ANIMATED COUNTERS
========================================================== */

const counters = document.querySelectorAll(".stat-card h2");

let counterStarted = false;

function runCounters(){

    if(counterStarted) return;

    const statsSection = document.querySelector(".statistics");

    if(!statsSection) return;

    const trigger = statsSection.getBoundingClientRect().top;

    if(trigger < window.innerHeight - 100){

        counterStarted = true;

        counters.forEach(counter=>{

            const originalText = counter.innerText;

            const number = parseInt(originalText.replace(/\D/g,""));

            const suffix = originalText.replace(/[0-9]/g,"");

            let current = 0;

            const increment = Math.max(1, Math.ceil(number / 80));

            const timer = setInterval(()=>{

                current += increment;

                if(current >= number){

                    current = number;

                    clearInterval(timer);

                }

                counter.innerText = current + suffix;

            },20);

        });

    }

}

window.addEventListener("scroll", runCounters);

runCounters();


/* ==========================================================
   BUTTON RIPPLE EFFECT
========================================================== */

const buttons = document.querySelectorAll("button");

buttons.forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const diameter = Math.max(

            this.clientWidth,

            this.clientHeight

        );

        ripple.style.width = diameter + "px";

        ripple.style.height = diameter + "px";

        ripple.style.left =

            e.offsetX - diameter / 2 + "px";

        ripple.style.top =

            e.offsetY - diameter / 2 + "px";

        const oldRipple =

            this.querySelector(".ripple");

        if(oldRipple){

            oldRipple.remove();

        }

        this.appendChild(ripple);

    });

});


/* ==========================================================
   REGISTRATION FORM VALIDATION
========================================================== */

const form = document.querySelector(".registration-form");

if(form){

    form.addEventListener("submit",function(e){

        e.preventDefault();

        const fullName =

            this.querySelector('input[type="text"]');

        const email =

            this.querySelector('input[type="email"]');

        const selects =

            this.querySelectorAll("select");

        if(

            fullName.value.trim()==="" ||

            email.value.trim()==="" ||

            selects[0].value==="" ||

            selects[1].value===""

        ){

            alert(

                "Please complete all required fields."

            );

            return;

        }

        const emailPattern =

            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email.value)){

            alert(

                "Please enter a valid email address."

            );

            return;

        }

        alert(

            "🎉 Registration submitted successfully!\n\nThank you for registering for Disruptor 3.0."

        );

        this.reset();

    });

}


/* ==========================================================
   PAGE FADE-IN
========================================================== */

window.addEventListener("load",()=>{

    document.body.style.opacity = "1";

});


/* ==========================================================
   IMAGE HOVER EFFECT
========================================================== */

const images = document.querySelectorAll(

    ".hero-image img, .about-image img"

);

images.forEach(image=>{

    image.addEventListener("mouseenter",()=>{

        image.style.transform =

            "scale(1.03)";

    });

    image.addEventListener("mouseleave",()=>{

        image.style.transform =

            "scale(1)";

    });

});


/* ==========================================================
   CURRENT YEAR IN FOOTER (Optional)
========================================================== */

const copyright = document.querySelector(".copyright");

if(copyright){

    const year = new Date().getFullYear();

    copyright.innerHTML =

        `© ${year} Neztrans Digitals. All Rights Reserved.`;

}


/* ==========================================================
   PREVENT EMPTY HASH LINKS
========================================================== */

document.querySelectorAll('a[href="#"]').forEach(link=>{

    link.addEventListener("click",e=>{

        e.preventDefault();

    });

});


/* ==========================================================
   INITIALIZATION
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    revealOnScroll();

    runCounters();

    console.log(

        "Disruptor 3.0 Website Loaded Successfully."

    );

});