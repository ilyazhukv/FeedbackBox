# FeedbackBox

A full-stack feedback management system designed for collecting, organizing, and analyzing user reports, suggestions, and feedback.

**This project was developed as a term paper for the 3rd year of college.**

## 📋 Project Overview

**FeedbackBox** provides a seamless interface for users to submit various types of reports and a robust, secure administrative panel for moderators to track statistics and manage post statuses.

## 🚀 Key Features

### User Interface
- **Report Submission:** Create posts categorized as Complaints, Suggestions, or Feedback.
- **Interactive Feed:** Browse, search, and filter reports in real-time.
- **Discussion System:** Engage with reports through a structured comment system.
- **Responsive Design:** Fully optimized for mobile and desktop using HeroUI.

### Admin Panel (Protected)
- **Secure Authentication:** JWT-based login system with encrypted password storage.
- **Advanced Dashboard:** Real-time statistics visualization using MongoDB Aggregation Pipelines.
- **Post Management:** Track and update report statuses (New, In-Progress, Resolved).
- **Reactive Auth:** Instant session management and automatic logout using reactive hooks.

### Security & Optimization
- **Rate Limiting:** Protection against brute-force attacks and API spamming.
- **Route Guarding:** Sophisticated Protected Routes to prevent unauthorized access.
- **Data Aggregation:** Server-side data processing for high-performance analytics.

## 🛠 Tech Stack

### Frontend
- **React 18** & **Vite**
- **TypeScript**
- **HeroUI** (formerly NextUI) — Component Library
- **Tailwind CSS** — Styling
- **React Router DOM v6** — Navigation
- **Axios** — API Requests

### Backend
- **Node.js** & **Express**
- **MongoDB** & **Mongoose** (Complex Aggregations)
- **JSON Web Token (JWT)** — Authentication
- **Bcrypt.js** — Password Hashing
- **Express Rate Limit** — Middleware Protection

## 🔧 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account (Atlas or Local)

### Installation

1. **Clone the repository:**
   ```bash
   git clone github.com

2. **Backend Setup:**
- Navigate to the backend folder.
- Install dependencies: npm install.
- Create a .env file and configure:
- PORT=5000
- MONGO_URI=your_mongodb_uri
- JWT_SECRET=your_jwt_secret
- SALT_WORK_FACTOR=10
- Start the server: npm run dev.

3. **Frontend Setup:**
- Navigate to the frontend folder.
- Install dependencies: npm install.
- Start the application: npm run dev.
- Developed with a focus on modern web standards and efficient data management.