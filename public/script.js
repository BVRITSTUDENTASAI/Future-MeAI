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
// =============================
// Form Submission + AI
// =============================

const form = document.querySelector("#careerForm form");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const name = form.querySelector('input[placeholder="Your Name"]').value.trim();
    const skills = form.querySelector('input[placeholder="Current Skills"]').value.trim();
    const career = form.querySelector('input[placeholder="Dream Career"]').value.trim();
    const level = form.querySelector("select").value;

    if(name==="" || skills==="" || career===""){
        alert("Please fill all the fields.");
        return;
    }

    if(level==="Select Experience Level"){
        alert("Please select your experience level.");
        return;
    }

    const button = form.querySelector("button");

    button.disabled = true;
    button.innerHTML = "Generating...";

    try{
        const response = await fetch("http://localhost:5000/generate", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name,
        skills,
        career,
        level
    })
});

if (!response.ok) {
    const text = await response.text();
    console.error(text);
    throw new Error("Server Error");
}

const data = await response.json();
        button.innerHTML = "Roadmap Generated ✓";

        let result = document.getElementById("result");

        if(!result){

            result = document.createElement("div");
            result.id = "result";

            result.style.margin = "50px auto";
            result.style.width = "90%";
            result.style.maxWidth = "1000px";
            result.style.padding = "30px";
            result.style.background = "rgba(255,255,255,0.12)";
            result.style.backdropFilter = "blur(12px)";
            result.style.borderRadius = "15px";
            result.style.whiteSpace = "pre-wrap";
            result.style.lineHeight = "30px";
            result.style.fontSize = "17px";

            document.body.insertBefore(result, document.querySelector("footer"));

        }

        result.innerHTML = "<h2>Your AI Career Roadmap</h2><br>" + data.roadmap;

        result.scrollIntoView({
            behavior:"smooth"
        });

    }

    catch(error){

        console.log(error);

        alert("Unable to connect to AI.");

    }

    button.disabled = false;
    button.innerHTML = "Generate Career Roadmap";

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