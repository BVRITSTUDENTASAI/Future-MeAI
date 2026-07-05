// =============================
// FutureMe AI - JavaScript
// =============================

// Buttons
const startBtn = document.getElementById("startBtn");
const generateBtn = document.getElementById("generateBtn");
const careerForm = document.getElementById("careerForm");

// Scroll to form
startBtn.onclick = function () {
    careerForm.scrollIntoView({
        behavior: "smooth"
    });
};

generateBtn.onclick = function () {
    careerForm.scrollIntoView({
        behavior: "smooth"
    });
};
// =============================
// Navigation
// =============================

const menuItems = document.querySelectorAll("nav ul li");

menuItems.forEach(function(item){

    item.onclick = function(){

        let text = item.innerText;

        if(text === "Home"){
            document.getElementById("hero").scrollIntoView({
                behavior:"smooth"
            });
        }

        if(text === "Features"){
            document.getElementById("features").scrollIntoView({
                behavior:"smooth"
            });
        }

        if(text === "Roadmaps"){
            document.getElementById("careerForm").scrollIntoView({
                behavior:"smooth"
            });
        }

        if(text === "About"){
            document.getElementById("steps").scrollIntoView({
                behavior:"smooth"
            });
        }

        if(text === "Contact"){
            document.querySelector("footer").scrollIntoView({
                behavior:"smooth"
            });
        }

    };

});


// =============================
// Form Validation
// =============================

const form = document.querySelector("#careerForm form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const inputs = form.querySelectorAll("input");
    const select = form.querySelector("select");

    for(let i=0;i<inputs.length;i++){

        if(inputs[i].value.trim()==""){
            alert("Please fill all the fields.");
            inputs[i].focus();
            return;
        }

    }

    if(select.selectedIndex==0){
        alert("Please select your experience level.");
        select.focus();
        return;
    }

    const button = form.querySelector("button");

    button.disabled = true;

    let count = 0;

    button.innerHTML = "Generating";

    const loading = setInterval(function(){

        count++;

        button.innerHTML = "Generating" + ".".repeat(count%4);

    },500);

    setTimeout(function(){

        clearInterval(loading);

        button.innerHTML="Roadmap Generated ✓";

        alert("Your personalized roadmap will be generated soon.");

        form.reset();

        button.disabled=false;

        button.innerHTML="Generate Career Roadmap";

    },3000);

});


// =============================
// Reveal Sections on Scroll
// =============================

const sections = document.querySelectorAll(
"#hero,#careerForm,#features,#steps,footer,.card,.step"
);

const observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0px)";

        }

    });

},{
    threshold:0.2
});

sections.forEach(function(section){

    section.style.opacity="0";
    section.style.transform="translateY(40px)";
    section.style.transition="all 0.8s";

    observer.observe(section);

});


// =============================
// Navbar Shadow
// =============================

window.addEventListener("scroll",function(){

    const nav=document.querySelector("nav");

    if(window.scrollY>20){

        nav.style.boxShadow="0 10px 25px rgba(0,0,0,0.10)";

    }

    else{

        nav.style.boxShadow="none";

    }

});


// =============================
// Hero Image Floating
// =============================

const heroImage=document.querySelector("#rightHero img");

if(heroImage){

    let moveUp=true;

    setInterval(function(){

        if(moveUp){

            heroImage.style.transform="translateY(-12px)";
            moveUp=false;

        }

        else{

            heroImage.style.transform="translateY(0px)";
            moveUp=true;

        }

    },1500);

}


// =============================
// Feature Card Hover
// =============================

const cards=document.querySelectorAll(".card");

cards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        card.style.transform="translateY(-10px)";
        card.style.boxShadow="0 12px 30px rgba(0,0,0,0.15)";

    });

    card.addEventListener("mouseleave",function(){

        card.style.transform="translateY(0px)";
        card.style.boxShadow="0 6px 16px rgba(0,0,0,0.08)";

    });

});


// =============================
// Welcome Message
// =============================

window.onload=function(){

    console.log("Welcome to FutureMe AI");

};