require("dotenv").config();

const express = require("express");
const path = require("path");
const Groq = require("groq-sdk");

const app = express();

// -------------------------------
// Check API Key
// -------------------------------
if (!process.env.GROQ_API_KEY) {
    console.log("❌ GROQ_API_KEY not found in .env");
    process.exit(1);
}

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// -------------------------------
// Home Route
// -------------------------------
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// -------------------------------
// Test Route
// -------------------------------
app.get("/test", (req, res) => {
    res.send("🚀 FutureMe AI Server is Running!");
});

// -------------------------------
// Generate Career Roadmap
// -------------------------------
app.post("/generate", async (req, res) => {

    console.log("📩 Request Received");
    console.log(req.body);

    try {

        const { name, skills, career, level } = req.body;

        if (!name || !skills || !career || !level) {
            return res.status(400).json({
                error: "Please fill all fields."
            });
        }

        const prompt = `
You are FutureMe AI.

Student Name: ${name}

Current Skills: ${skills}

Dream Career: ${career}

Experience Level: ${level}

Generate a detailed career roadmap with:

1. Career Overview
2. Skills Required
3. Technologies
4. Learning Path
5. Free Resources
6. Certifications
7. Projects
8. Interview Preparation
9. Resume Tips
10. Daily Study Plan

Use headings, bullet points and emojis.
`;

        console.log("📤 Sending request to Groq...");

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 2048,
        });

        console.log("✅ Response received");

        res.json({
            roadmap: completion.choices[0].message.content,
        });

    } catch (err) {

        console.log("========== GROQ ERROR ==========");

        console.dir(err, { depth: null });

        res.status(500).json({
            error: err.message || "Failed to generate roadmap.",
        });
    }
});

// -------------------------------
// Start Server
// -------------------------------
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

server.on("close", () => {
    console.log("❌ Server closed!");
});

process.on("exit", (code) => {
    console.log("❌ Process exited with code:", code);
});

process.on("beforeExit", (code) => {
    console.log("⚠️ beforeExit:", code);
});

setInterval(() => {
    console.log("✅ Server still alive...");
}, 5000);