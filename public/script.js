// =============================
// FutureMe AI
// =============================

const startBtn = document.getElementById("startBtn");
const generateBtn = document.getElementById("generateBtn");
const careerForm = document.getElementById("careerForm");
const form = document.querySelector("#careerForm form");

// -----------------------------
// Smooth Scroll
// -----------------------------

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

// -----------------------------
// Form Submission
// -----------------------------

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

    if (level === "Select Experience Level") {
        alert("Please select your experience level.");
        return;
    }

    const button = form.querySelector("button");

    button.disabled = true;
    button.innerHTML = "Generating AI Roadmap...";

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

        let result = document.getElementById("result");

        if (!result) {

            result = document.createElement("div");

            result.id = "result";

            document.body.insertBefore(
                result,
                document.querySelector("footer")
            );

        }

        result.innerHTML = `
        <h2>🚀 Your Personalized AI Career Roadmap</h2>

        <div style="white-space:pre-wrap;">
        ${data.roadmap}
        </div>
        `;

        result.scrollIntoView({
            behavior: "smooth"
        });

        button.innerHTML = "Generate Again";

        button.disabled = false;

    }

    catch (error) {

        console.log(error);

        alert("Unable to connect to AI Server.");

        button.disabled = false;

        button.innerHTML = "Generate Career Roadmap";

    }

});