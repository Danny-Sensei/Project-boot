/* ==========================================
   DISRUPTORS 3.0
   Neztrans Digitals
   script.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==============================
       STICKY NAV SHADOW
    ============================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });

    /* ==============================
       SCROLL REVEAL
    ============================== */

    const reveals = document.querySelectorAll(
        ".card, .feature-card, .detail-card, .about-container, .register-container, .section-title"
    );

    const revealOnScroll = () => {

        reveals.forEach((element) => {

            const windowHeight = window.innerHeight;
            const top = element.getBoundingClientRect().top;

            if (top < windowHeight - 120) {
                element.classList.add("active");
            }

        });

    };

    window.addEventListener("scroll", revealOnScroll);

    revealOnScroll();

    /* ==============================
       SMOOTH SCROLL
    ============================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });

    /* ==============================
       ACTIVE NAV LINK
    ============================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }

        });

    });

    /* ==============================
       CARD TILT EFFECT
    ============================== */

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = ((y / rect.height) - 0.5) * -12;
            const rotateY = ((x / rect.width) - 0.5) * 12;

            card.style.transform =
                `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

    /* ==============================
       BUTTON RIPPLE EFFECT
    ============================== */

    const buttons = document.querySelectorAll("button, .btn, .hero-btn");

    buttons.forEach(button => {

        button.addEventListener("click", function(e) {

            const ripple = document.createElement("span");

            const diameter = Math.max(this.clientWidth, this.clientHeight);

            ripple.style.width = ripple.style.height = diameter + "px";

            ripple.style.left = e.offsetX - diameter / 2 + "px";
            ripple.style.top = e.offsetY - diameter / 2 + "px";

            ripple.classList.add("ripple");

            const oldRipple = this.querySelector(".ripple");

            if (oldRipple) {

                oldRipple.remove();

            }

            this.appendChild(ripple);

        });

    });


});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuToggle){

menuToggle.addEventListener("click",()=>{

navLinks.classList.toggle("active");

});

}

document.querySelectorAll(".nav-links a").forEach(link=>{

link.addEventListener("click",()=>{

navLinks.classList.remove("active");

});

});