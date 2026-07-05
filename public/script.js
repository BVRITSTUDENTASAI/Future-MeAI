// Navigation Buttons

const startBtn = document.getElementById("startBtn");
const roadmapBtn = document.getElementById("generateBtn");

startBtn.addEventListener("click", function () {
    document.getElementById("careerForm").scrollIntoView({
        behavior: "smooth"
    });
});

roadmapBtn.addEventListener("click", function () {
    document.getElementById("careerForm").scrollIntoView({
        behavior: "smooth"
    });
});


// Navbar Menu

document.querySelectorAll("nav ul li").forEach(function (item) {

    item.addEventListener("click", function () {

        let section = item.innerText.toLowerCase();

        if (section === "home") {
            document.getElementById("hero").scrollIntoView({
                behavior: "smooth"
            });
        }

        else if (section === "features") {
            document.getElementById("features").scrollIntoView({
                behavior: "smooth"
            });
        }

        else if (section === "roadmaps") {
            document.getElementById("careerForm").scrollIntoView({
                behavior: "smooth"
            });
        }

        else if (section === "about") {
            document.getElementById("steps").scrollIntoView({
                behavior: "smooth"
            });
        }

        else if (section === "contact") {
            document.querySelector("footer").scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});


// Form Validation

const form = document.querySelector("#careerForm form");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = form.querySelector('input[placeholder="Your Name"]');
    const skills = form.querySelector('input[placeholder="Current Skills"]');
    const career = form.querySelector('input[placeholder="Dream Career"]');
    const level = form.querySelector("select");

    if (
        name.value.trim() === "" ||
        skills.value.trim() === "" ||
        career.value.trim() === "" ||
        level.selectedIndex === 0
    ) {

        alert("Please fill all the fields.");

        return;

    }

    const button = form.querySelector("button");

    button.disabled = true;

    let dots = 0;

    button.innerHTML = "Generating";

    const loading = setInterval(function () {

        dots++;

        button.innerHTML = "Generating" + ".".repeat(dots % 4);

    }, 400);


    setTimeout(function () {

        clearInterval(loading);

        button.innerHTML = "Roadmap Generated ✓";

        setTimeout(function () {

            alert(
                "FutureMe AI will soon generate a personalized roadmap based on your career goal."
            );

            form.reset();

            button.disabled = false;

            button.innerHTML = "Generate Career Roadmap";

        }, 1000);

    }, 3000);

});


// Scroll Animation

const revealItems = document.querySelectorAll(
    "#hero, #careerForm, .card, .step, footer"
);

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});

revealItems.forEach(function (item) {

    observer.observe(item);

});


// Navbar Shadow

window.addEventListener("scroll", function () {

    const nav = document.querySelector("nav");

    if (window.scrollY > 30) {

        nav.style.boxShadow = "0 8px 25px rgba(0,0,0,0.12)";

    }

    else {

        nav.style.boxShadow = "none";

    }

});


// Card Hover Effect

document.querySelectorAll(".card").forEach(function (card) {

    card.addEventListener("mouseenter", function () {

        card.style.transform = "translateY(-8px)";

    });

    card.addEventListener("mouseleave", function () {

        card.style.transform = "translateY(0px)";

    });

});


// Hero Image Floating Animation

const heroImage = document.querySelector("#rightHero img");

let direction = 1;

setInterval(function () {

    if (direction === 1) {

        heroImage.style.transform = "translateY(-10px)";

        direction = 0;

    }

    else {

        heroImage.style.transform = "translateY(0px)";

        direction = 1;

    }

}, 1500);