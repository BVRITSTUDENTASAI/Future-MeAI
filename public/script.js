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
        result.innerHTML = ` <h2>Your AI Career Roadmap</h2> <div>${data.roadmap.replace(/\n/g, "<br>")}</div>`;
        result.scrollIntoView({
            behavior:"smooth"
        });

    }
    catch(error){

    console.log(error);

    let result = document.getElementById("result");

    if(!result){
        result = document.createElement("div");
        result.id = "result";
        document.body.insertBefore(result, document.querySelector("footer"));
    }

    let roadmap = "";

    if(career.toLowerCase().includes("software")){

        roadmap = `
<h2>🚀 Software Engineer Career Roadmap</h2>

<p>Hello <b>${name}</b>, based on your experience level (<b>${level}</b>) and your current skills (<b>${skills}</b>), here is your personalized roadmap.</p>

<h3>Phase 1: Programming Fundamentals</h3>
<ul>
<li>Master Java, Python or JavaScript.</li>
<li>Understand Object-Oriented Programming.</li>
<li>Practice coding every day.</li>
</ul>

<h3>Phase 2: Core Computer Science</h3>
<ul>
<li>Data Structures & Algorithms.</li>
<li>Operating Systems.</li>
<li>Database Management Systems.</li>
<li>Computer Networks.</li>
</ul>

<h3>Phase 3: Development</h3>
<ul>
<li>Build 5 real-world projects.</li>
<li>Learn Git & GitHub.</li>
<li>Learn React and Node.js.</li>
</ul>

<h3>Phase 4: Career Preparation</h3>
<ul>
<li>Create resume.</li>
<li>Prepare for coding interviews.</li>
<li>Apply for internships.</li>
</ul>
`;

    }

    else if(career.toLowerCase().includes("data")){

        roadmap = `
<h2>📊 Data Scientist Career Roadmap</h2>

<p>Hello <b>${name}</b>, your current skills are <b>${skills}</b>. Here's your learning path.</p>

<h3>Phase 1</h3>
<ul>
<li>Python Programming</li>
<li>Statistics</li>
<li>Probability</li>
<li>SQL</li>
</ul>

<h3>Phase 2</h3>
<ul>
<li>NumPy</li>
<li>Pandas</li>
<li>Matplotlib</li>
<li>Data Cleaning</li>
</ul>

<h3>Phase 3</h3>
<ul>
<li>Machine Learning</li>
<li>Scikit-Learn</li>
<li>Model Evaluation</li>
<li>Deep Learning Basics</li>
</ul>

<h3>Phase 4</h3>
<ul>
<li>Portfolio Projects</li>
<li>Kaggle Competitions</li>
<li>Resume & Interviews</li>
</ul>
`;

    }

    else if(career.toLowerCase().includes("ui") || career.toLowerCase().includes("ux") || career.toLowerCase().includes("designer")){

        roadmap = `
<h2>🎨 UI/UX Designer Roadmap</h2>

<ul>
<li>Learn UI Design Principles.</li>
<li>Master Figma.</li>
<li>Study Color Theory.</li>
<li>Create Mobile App Designs.</li>
<li>Build Portfolio.</li>
<li>Learn User Research.</li>
<li>Prepare Case Studies.</li>
</ul>
`;

    }

    else{

        roadmap = `
<h2>🎯 ${career} Career Roadmap</h2>

<p>Hello <b>${name}</b>.</p>

<p>Your current skills: <b>${skills}</b></p>

<ul>
<li>Research industry requirements.</li>
<li>Take professional certification courses.</li>
<li>Develop practical experience.</li>
<li>Create strong projects.</li>
<li>Improve communication skills.</li>
<li>Network with professionals.</li>
<li>Build a portfolio.</li>
<li>Prepare resume.</li>
<li>Practice interviews.</li>
<li>Apply confidently.</li>
</ul>
`;

    }
    roadmap += `

<hr>

<h3>🎉 Final Words</h3>

<p>
Well done, <b>${name}</b>! If you've read this far, you've already taken the first step that many people never do—actually starting.
</p>

<p>
Your dream of becoming a <b>${career}</b> isn't just a dream anymore—it's now a plan. Every new skill you learn, every project you build, and every mistake you fix is helping you become a better version of yourself.
</p>

<p>
Don't worry if things feel difficult sometimes. Every professional has stared at a screen wondering why nothing works... only to realize they forgot a tiny semicolon, misspelled one variable, or spent two hours debugging while the solution was on the first line. 😂
</p>

<p>
Imagine yourself one year from now. The projects you create today could become the reason someone offers you your dream job tomorrow. Your future teammates might be waiting to meet you—they just don't know it yet.
</p>

<p>
Stay curious. Keep building. Ask questions. Learn from failures. Celebrate small wins. Repeat.
</p>

<p>
And remember... the only thing standing between you and your dream career is a series of small, consistent steps. So start today—your future self is already cheering for you! 🚀🔥
</p>

<div style="margin-top:30px;padding:20px;border-radius:15px;background:rgba(255,209,102,0.15);border:1px solid rgba(255,209,102,0.3);text-align:center;">
<h3 style="margin-bottom:10px;">🏆 FutureMe AI Prediction</h3>

<p style="font-size:18px;">
We predict that if <b>${name}</b> stays consistent and keeps improving their <b>${skills}</b> skills, they'll be well on their way to becoming an excellent <b>${career}</b>. 🚀
</p>

<p style="font-size:16px;">
Now close this roadmap... and go build something amazing. Your future employer is waiting. 😉
</p>
</div>
`;
    result.innerHTML = roadmap;

    result.scrollIntoView({
        behavior:"smooth"
    });

    button.disabled = false;
    button.innerHTML = "Generate Career Roadmap";
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