console.log("THIS IS MY SERVER.JS");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const OpenAI = require("openai");
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
app.get("/test", (req, res) => {
    res.send("Server is working!");
});

// AI Route
app.post("/generate", async (req, res) => {
     console.log("Generate route reached!");
    console.log(req.body);
    console.log("API KEY:", process.env.OPENAI_API_KEY);
    const { name, skills, career, level } = req.body;
    const prompt = `
You are a career mentor.
Generate a detailed career roadmap.
Name: ${name}
Current Skills: ${skills}
Dream Career: ${career}
Experience Level: ${level}
Include:
1. Skill Gap
2. Learning Roadmap
3. Best Projects
4. Certifications
5. Interview Preparation
6. Career Advice
`;
    try {
        const response = await client.responses.create({
            model: "gpt-4o-mini",
            input: prompt
        });
        res.json({
            roadmap: response.output_text
        });
    } catch (error) {
    console.log("🔥 FULL ERROR:", error);
    console.log("🔥 ERROR MESSAGE:", error.message);
    console.log("🔥 ERROR STATUS:", error.status);

    return res.status(500).json({
        error: error.message
    });
}
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});