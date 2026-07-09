require("dotenv").config();

const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/test", (req, res) => {
    res.send(" FutureMe AI Server is Running!");
});

app.post("/generate", async (req, res) => {

    try {

        const { name, skills, career, level } = req.body;

        if (!name || !skills || !career || !level) {
            return res.status(400).json({
                error: "Please fill all fields."
            });
        }

        const prompt = `
You are FutureMe AI, an intelligent AI Career Mentor.

Student Name:
${name}

Current Skills:
${skills}

Dream Career:
${career}

Experience Level:
${level}

Generate a highly personalized career roadmap.

The roadmap must contain the following sections:

1. Welcome Message

2. Career Overview

3. Skills Required

4. Programming Languages

5. Technologies To Learn

6. Step-by-Step Learning Path

7. Best Free Resources

8. Recommended Certifications

9. Beginner Projects

10. Intermediate Projects

11. Advanced Projects

12. Interview Preparation Tips

13. Resume Tips

14. GitHub Portfolio Tips

15. Daily Study Plan

16. Weekly Study Plan

17. Common Mistakes To Avoid

18. Estimated Time Required

19. Motivation

Format the response beautifully using headings, bullet points and emojis.
`;

        const response = await client.responses.create({

            model: "gpt-4.1-mini",

            input: prompt

        });

        const roadmap = response.output_text;

        res.json({
            roadmap
        });

    }
    catch (error) {

        console.error("OpenAI Error:");
        console.error(error);

        res.status(500).json({
            error: "Failed to generate roadmap."
        });

    }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 FutureMe AI running on http://localhost:${PORT}`);

});