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
app.post("/generate", async (req, res) => {

    console.log("🔥 Route reached");

    try {
        const { name, skills, career, level } = req.body;

        console.log("📦 Request body:", req.body);
        console.log("🔑 API KEY exists:", !!process.env.OPENAI_API_KEY);

        const prompt = `
You are a career mentor.
Generate a detailed career roadmap.

Name: ${name}
Skills: ${skills}
Career: ${career}
Level: ${level}
`;

        console.log("🚀 Calling OpenAI...");

        const response = await client.responses.create({
            model: "gpt-4o-mini",
            input: prompt
        });

        console.log(" OpenAI success");

        return res.json({
            roadmap: response.output_text
        });

    } catch (error) {
        console.log("🔥 FULL ERROR:");
        console.log(error);
        console.log("🔥 MESSAGE:", error.message);

        return res.status(500).json({
            error: error.message
        });
    }
});
// AI Route
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});