// =============================
// FutureMe AI
// =============================

const startBtn = document.getElementById("startBtn");
const generateBtn = document.getElementById("generateBtn");
const careerForm = document.getElementById("careerForm");
const form = document.querySelector("#careerForm form");
const result = document.getElementById("result");

// Smooth Scroll
startBtn.addEventListener("click", () => {
    careerForm.scrollIntoView({ behavior: "smooth" });
});

generateBtn.addEventListener("click", () => {
    careerForm.scrollIntoView({ behavior: "smooth" });
});

// Form Submit
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = form.querySelector('input[placeholder="Your Name"]').value.trim();
    const skills = form.querySelector('input[placeholder="Current Skills"]').value.trim();
    const career = form.querySelector('input[placeholder="Dream Career"]').value.trim();
    const level = form.querySelector("select").value;

    if (!name || !skills || !career || !level) {
        alert("Please fill all fields.");
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
            throw new Error(data.error || "Failed to generate roadmap.");
        }

        result.style.display = "block";

        result.innerHTML = `
            <h2>🚀 Your Personalized AI Career Roadmap</h2>
            <div style="white-space: pre-wrap;">
                ${data.roadmap}
            </div>
        `;

        result.scrollIntoView({
            behavior: "smooth"
        });

    } catch (err) {

        console.error(err);
        alert(err.message);

    } finally {

        button.disabled = false;
        button.innerHTML = "Generate Career Roadmap";

    }

});

// Reveal Animation
const sections = document.querySelectorAll(
"#hero,#careerForm,#features,#steps,#result,footer,.card,.step"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.2
});

sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "all .8s ease";
    observer.observe(section);
});

// Navbar Shadow
window.addEventListener("scroll", () => {

    const nav = document.querySelector("nav");

    if (window.scrollY > 20) {
        nav.style.boxShadow = "0 10px 25px rgba(0,0,0,.15)";
    } else {
        nav.style.boxShadow = "none";
    }

});

// Welcome
window.onload = () => {
    console.log("🚀 Welcome to FutureMe AI");
};