Party Hunt

Party Hunt is a full-stack web application that allows users to create, explore, and join parties happening in their area. Whether you're looking to host a private event or find the next big public party, Party Hunt makes it easy to connect people through events.

Live Demo:
(Add link here if hosted, e.g. Vercel or Render)

Technologies Used:

Frontend:

- React (with Vite)
- Tailwind CSS
- Axios

Backend:

- Node.js with Express.js
- MongoDB (Mongoose)
- JWT for authentication
- bcryptjs for password hashing

Other Tools:

- Postman for API testing
- Git & GitHub for version control
- MongoDB Atlas for database hosting

Project Structure:

client/ -> React frontend (Vite)
└── src/
└── components/
└── pages/
└── services/

server/ -> Express backend
└── controllers/
└── routes/
└── models/
└── middleware/

.env -> Environment variables
README.md

Features:

- User registration and login with JWT authentication
- Party creation form for logged-in users
- List of upcoming parties with filters
- Detailed view for each party
- Join/attend button for events
- Responsive design for mobile and desktop
- MongoDB date filtering to exclude past events

Getting Started:

1. Clone the repository:
   git clone https://github.com/AleksandaPrpa/Party-Hunt.git
   cd Party-Hunt

2. Backend Setup:
   cd server
   npm install

# Create a .env file with:

# MONGO_URI=your_mongodb_uri

# JWT_SECRET=your_secret_key

node --env-file=config.env server

3. Frontend Setup:
   cd client
   npm install
   npm run dev -- --host

Example API Endpoints:

Method Endpoint Description
POST /api/auth/register Register new user
POST /api/auth/login Login and receive JWT token
GET /api/parties Fetch all upcoming parties
POST /api/parties Create a new party

Challenges & Learnings:

During development, I faced several challenges such as filtering only future parties based on the event date, handling JWT tokens securely, and ensuring responsive layout on mobile devices. Solving these helped me better understand full-stack development and RESTful API architecture.

Future Improvements:

- Implement notifications for upcoming parties
- Add profile pages with user’s attended events
- Add support for image uploads

Author:

Name: Aleksandar Prpa
Project: Graduation project for Web Programming
Year: 2025
School: Gimnazija Ćuprija
Mentor: Dalibor Rajković

License:

This project is licensed under the MIT License.
