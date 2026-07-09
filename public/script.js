// =============================
// FutureMe AI
// =============================

const startBtn = document.getElementById("startBtn");
const generateBtn = document.getElementById("generateBtn");
const careerForm = document.getElementById("careerForm");
const form = document.querySelector("#careerForm form");
const result = document.getElementById("result");

// =============================
// Smooth Scroll
// =============================

startBtn.addEventListener("click", () => {
    careerForm.scrollIntoView({
        behavior: "smooth"
    });
});

generateBtn.addEventListener("click", () => {
    careerForm.scrollIntoView({
        behavior: "smooth"
    });
});

// =============================
// Form Submission
// =============================

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = form.querySelector('input[placeholder="Your Name"]').value.trim();
    const skills = form.querySelector('input[placeholder="Current Skills"]').value.trim();
    const career = form.querySelector('input[placeholder="Dream Career"]').value.trim();
    const level = form.querySelector("select").value;

    if (!name || !skills || !career) {
        alert("Please fill all the fields.");
        return;
    }

    if (level === "" || level === "Select Experience Level") {
        alert("Please select your experience level.");
        return;
    }

    const button = form.querySelector("button");

    button.disabled = true;
    button.innerHTML = "🤖 Generating AI Roadmap...";

    try {
        
        const response = await fetch("/generate", {
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

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        result.style.display = "block";

        result.innerHTML = `
            <h2>🚀 Your Personalized AI Career Roadmap</h2>
            <div style="white-space:pre-wrap;">
${data.roadmap}
            </div>
        `;

        result.scrollIntoView({
            behavior: "smooth"
        });

    }
    catch (error) {
    console.log("========== GROQ ERROR ==========");
    console.dir(error, { depth: null });

    res.status(500).json({
        error: error.message || "Failed to generate roadmap."
    });
}
});

// =============================
// Reveal Animation
// =============================

const sections = document.querySelectorAll(
"#hero,#careerForm,#features,#steps,#result,footer,.card,.step"
);

const observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:0.2
});

sections.forEach(function(section){

    section.style.opacity="0";
    section.style.transform="translateY(40px)";
    section.style.transition="all .8s ease";

    observer.observe(section);

});

// =============================
// Navbar Shadow
// =============================

window.addEventListener("scroll",function(){

    const nav=document.querySelector("nav");

    if(window.scrollY>20){

        nav.style.boxShadow="0 10px 25px rgba(0,0,0,.15)";

    }else{

        nav.style.boxShadow="none";

    }

});

// =============================
// Feature Card Hover
// =============================

const cards=document.querySelectorAll(".card");

cards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        card.style.transform="translateY(-10px) scale(1.03)";

    });

    card.addEventListener("mouseleave",function(){

        card.style.transform="translateY(0) scale(1)";

    });

});

// =============================
// Welcome
// =============================

window.onload=function(){

    console.log("🚀 Welcome to FutureMe AI");

};