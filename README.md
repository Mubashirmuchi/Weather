Weather App (MERN Stack)

This is a full-stack weather application built using the MERN (MongoDB, Express, React, Node.js) stack.

Getting Started

Follow the instructions below to set up and run the project on your local machine.

Prerequisites

Ensure you have the following software installed:
- Node.js
- npm (Node Package Manager)
- Git

Installation

1. Clone the repository:
   git clone <repository-url>
   Replace <repository-url> with the URL of your Git repository.

2. Navigate to the client directory and install dependencies:
   cd client
   npm install

3. Start the client development server:
   npm run dev
   The client application will be available at http://localhost:5173.

4. Navigate to the server directory and install dependencies:
   cd server
   npm install

5. Start the server:
   npm run dev
   The server will be available at http://localhost:3000/api.

API Endpoints

User Authentication

- Signup
  POST http://localhost:3000/api/signup
  Example Input:
  {
    "name": "John",
    "email": "john@gmail.com",
    "password": "John@123"
  }

- Login
  POST http://localhost:3000/api/login
  Example Input:
  {
    "email": "john@gmail.com",
    "password": "John@123"
  }

- Logout
  POST http://localhost:3000/api/logout

Weather Information

- Get Current City Weather
  GET http://localhost:3000/api/weather/current?city=calicut

- Get 5-Day Weather Forecast for a City
  GET http://localhost:3000/api/weather/forecast?city=calicut

Favorite Cities

- Add to Favorites
  POST http://localhost:3000/api/favorite

- Get Favorite Cities
  GET http://localhost:3000/api/favorite

Project Structure

- client/: Contains the frontend code built with React.
- server/: Contains the backend code built with Node.js and Express.
- package.json: Contains project metadata and dependencies.

Technologies Used

- Frontend: React, Tailwind CSS, reduxjs, axios, react-router-dom, react-toastify
- Backend: Node.js, Express, bcryptjs, jsonwebtoken
- Database: MongoDB,
- Other: JWT for authentication, Axios for HTTP requests , Prisma ORM

Features

- User authentication (signup, login, logout)
- Fetch and display current weather information for a city
- Fetch and display 5-day weather forecast for a city
- Add and manage favorite cities

