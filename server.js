console.log("THIS IS MY SERVER.JS");

const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/test", (req, res) => {
    res.send("Server is working!");
});

app.post("/generate", (req, res) => {

    const { name, skills, career, level } = req.body;

    let roadmap = "";

    if (career.toLowerCase().includes("software")) {

        roadmap = `
🚀 SOFTWARE ENGINEER ROADMAP

Hello ${name}!

Current Skills: ${skills}
Experience Level: ${level}

Phase 1:
• Learn Java, Python or JavaScript
• Master Object Oriented Programming
• Practice coding every day

Phase 2:
• Data Structures & Algorithms
• DBMS
• Operating Systems
• Computer Networks

Phase 3:
• Build 5 real-world projects
• Learn Git & GitHub
• Learn React and Node.js

Phase 4:
• Create Resume
• Practice Interviews
• Apply for Internships

🎉 Stay consistent. Every bug you solve makes you a better developer!
`;

    } else if (career.toLowerCase().includes("data")) {

        roadmap = `
📊 DATA SCIENTIST ROADMAP

Hello ${name}!

Current Skills: ${skills}
Experience Level: ${level}

Phase 1:
• Python
• SQL
• Statistics

Phase 2:
• NumPy
• Pandas
• Data Visualization

Phase 3:
• Machine Learning
• Deep Learning
• Build ML Projects

Phase 4:
• Kaggle
• Portfolio
• Resume

🚀 Keep learning. Your next dataset could become your next opportunity!
`;

    } else {

        roadmap = `
🎯 ${career.toUpperCase()} ROADMAP

Hello ${name}!

Current Skills: ${skills}
Experience Level: ${level}

• Learn the fundamentals.
• Take online courses.
• Build practical projects.
• Improve communication skills.
• Build a portfolio.
• Practice interviews.
• Apply for internships and jobs.

🚀 Small progress every day leads to big success tomorrow!
`;
    }
    res.json({ roadmap });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});