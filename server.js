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

    if (career.toLowerCase().includes("software")) {

    if(level.toLowerCase() === "beginner"){

roadmap = `
🚀 ===============================
        SOFTWARE ENGINEER ROADMAP
==================================

Hello ${name}! 👋

Congratulations on choosing Software Engineering.

Current Skills:
${skills}

Experience Level:
${level}

----------------------------------
📖 PHASE 1 : Programming Basics
----------------------------------

✔ Learn one programming language deeply.

Recommended:
• Java
• Python
• JavaScript

Topics

• Variables
• Data Types
• Loops
• Functions
• Arrays
• Strings
• OOP Concepts
• Exception Handling
• File Handling

Goal

Solve 150 beginner coding problems.

----------------------------------
📖 PHASE 2 : Problem Solving
----------------------------------

Study

• Time Complexity
• Space Complexity
• Big O

Master

• Arrays
• Strings
• Linked List
• Stack
• Queue
• Trees
• BST
• Graph
• Heap
• HashMap
• Dynamic Programming

Practice

• LeetCode
• HackerRank
• CodeChef
• GeeksforGeeks

Goal

Solve 300+ coding questions.

----------------------------------
📖 PHASE 3 : Core Subjects
----------------------------------

Study

✔ DBMS
✔ Operating Systems
✔ Computer Networks
✔ OOP
✔ Software Engineering

Understand

• SQL Queries
• Transactions
• Deadlocks
• Scheduling
• TCP/IP
• HTTP
• REST API

Goal

Be comfortable answering interview questions.

----------------------------------
📖 PHASE 4 : Development
----------------------------------

Learn

✔ HTML
✔ CSS
✔ JavaScript

Then

✔ React
✔ Node.js
✔ Express

Database

✔ MySQL
✔ MongoDB

Version Control

✔ Git
✔ GitHub

Goal

Build real applications.

----------------------------------
🚀 PROJECTS
----------------------------------

Project 1
Student Management System

Project 2
Hospital Management

Project 3
Library Management

Project 4
Weather Application

Project 5
Chat Application

Project 6
Expense Tracker

Project 7
Portfolio Website

Project 8
E-Commerce Website
----------------------------------
📜 CERTIFICATIONS
----------------------------------
✔ Google
✔ Microsoft Learn
✔ Oracle Java
✔ AWS Academy
✔ Coursera
✔ Udemy
----------------------------------
💼 INTERVIEW PREPARATION
----------------------------------
✔ Resume
✔ LinkedIn
✔ GitHub Portfolio
✔ HR Questions
✔ Mock Interviews
✔ Aptitude
✔ Coding Interviews
----------------------------------
📚 DAILY ROUTINE
----------------------------------
Morning
1 Hour Coding
Afternoon
Watch Tutorials
Evening
Build Projects
Night
Solve Coding Questions
----------------------------------
🔥 TIPS
----------------------------------
Never copy projects.
Understand every line.
Push code daily to GitHub.
Read documentation.
Build something every week.
Stay consistent.
----------------------------------
🎯 1 YEAR GOAL
----------------------------------
✔ Strong Programming
✔ 500 Coding Questions
✔ 8 Projects
✔ Resume
✔ Portfolio
✔ Internship Ready
----------------------------------
😂 Motivation
----------------------------------
Dear ${name},

Today's bugs become tomorrow's interview stories.

Every error teaches something.

Every project increases your confidence.

Every commit on GitHub is one step closer to your dream job.

Future you is already smiling because you didn't quit.

Now close this roadmap...

Open VS Code...

And build something awesome.

🚀 Happy Coding!
`;
    }
    else if(level.toLowerCase() === "intermediate"){
roadmap = `
🚀 SOFTWARE ENGINEER ROADMAP (INTERMEDIATE)

Hello ${name}!

Since you already know:

${skills}

it's time to level up.

PHASE 1

✔ Advanced JavaScript

✔ TypeScript

✔ React

✔ Redux

✔ Node.js

✔ Express

PHASE 2

Master

• REST APIs

• Authentication

• JWT

• MongoDB

• SQL

• Docker Basics

PHASE 3

Projects

✔ Social Media App

✔ Food Delivery App

✔ Chat App

✔ LMS Portal

✔ Job Portal

PHASE 4

Deployment

✔ Render

✔ Vercel

✔ Netlify

✔ GitHub Actions

PHASE 5

Interview

Solve 700 Coding Problems

Mock Interviews

System Design Basics

Low Level Design

High Level Design

Motivation

${name},

The difference between a junior and senior developer isn't talent.

It's consistency.

Keep building.

Keep learning.

Keep shipping.

🚀
`;
    }
    else{
roadmap = `
🏆 SOFTWARE ENGINEER ROADMAP (ADVANCED)

Hello ${name},

You already possess:

${skills}

Now focus on becoming an industry-level engineer.

Topics

✔ System Design

✔ Kubernetes

✔ Docker

✔ CI/CD

✔ AWS

✔ Azure

✔ Microservices

✔ Redis

✔ Kafka

✔ Design Patterns

Projects

✔ Netflix Clone

✔ Amazon Clone

✔ Distributed Chat App

✔ Video Streaming Platform

✔ Banking Backend

Interview

FAANG Preparation

1000+ Coding Problems

Behavioral Interviews

Leadership

Code Reviews

Open Source Contributions

Future Goal

Become a Tech Lead.

Build products used by millions.

Keep inspiring others.

🔥 Never stop learning.
`;
    }
}
    res.json({ roadmap });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});