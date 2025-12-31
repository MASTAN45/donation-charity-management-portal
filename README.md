
🌍 Donation & Charity Management Portal

A full-stack web application designed to connect donors, NGOs, and administrators on a single platform to manage donations, contributions, and charitable activities efficiently.

This project is built as part of a Software Engineering Training Program, following real-world development practices and clean project structure.


---

✨ Features

👤 User (Donor)

User registration and login

Secure authentication using JWT

Make donations to various causes

View available causes and details

Option to donate anonymously

View donation-related information


🏢 NGO / Admin

Create and manage donation campaigns

Track donations and contributions

View donor statistics and leaderboard data


⚙️ System

RESTful APIs for frontend–backend communication

Secure password handling using bcrypt

MySQL database for persistent data storage

Clean separation of frontend and backend



---

🛠️ Tech Stack

Frontend

Angular

HTML5, SCSS, TypeScript

Angular Standalone Components

Responsive UI design


Backend

Node.js

Express.js

MySQL

JWT Authentication

bcrypt for password hashing


Database

MySQL (relational database)



---

📂 Project Structure

donation-charity-management-portal/
├── backend/
│   ├── dist/
│   ├── src/
│   ├── package.json
│   └── README_BACKEND.md
│
├── frontend/
│   └── donation-charity-frontend/
│       ├── src/
│       ├── public/
│       ├── angular.json
│       ├── package.json
│       ├── tsconfig.json
│       └── .gitignore
│
├── README.md
├── MYSQL_SETUP.md
└── QUICKSTART.md






---

🚀 Getting Started

Prerequisites

Make sure you have the following installed:

Node.js (v18+ recommended)

Angular CLI

MySQL Server

Git



---

▶️ Running the Project Locally

1️⃣ Clone the Repository

git clone https://github.com/MASTAN45/donation-charity-management-portal.git
cd donation-charity-management-portal


---

2️⃣ Backend Setup

cd backend
npm install
npm run build
npm start

Backend will run on:

http://localhost:3000

Health check:

http://localhost:3000/health


---

3️⃣ Database Setup

Install MySQL

Create the database:


CREATE DATABASE charity_portal;

Update database credentials in backend configuration

Tables are auto-created on backend startup


Refer:

MYSQL_SETUP.md


---

4️⃣ Frontend Setup

cd frontend/donation-charity-frontend
npm install
ng serve

Frontend will run on:

http://localhost:4200


---

🔐 Authentication Flow

User registers → password hashed using bcrypt

Login generates JWT token

Token used for protected API routes

Frontend communicates with backend using REST APIs



---

📡 API Endpoints (Sample)

POST   /api/users/register
POST   /api/users/login
GET    /api/users/profile
GET    /api/donations
POST   /api/donations
GET    /api/leaderboard/statistics


---

📌 Notes

Mock APIs can be toggled via environment.ts

Project follows clean Git practices

Designed to be scalable and extendable

Built with real-world software engineering standards



---

👨‍💻 Authors

Shaik Mastan Vali, Sakthivel, Dharani Dharan, Rithika





