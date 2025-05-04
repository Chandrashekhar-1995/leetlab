# LeetLab Backend

LeetLab is a full-stack LeetCode clone. This repository contains the backend boilerplate code for the project. The backend is built with **Node.js**, **Express**, and **MongoDB**, and it serves as the API and business logic layer for the application.

## 🚀 Features (Planned)
- User Authentication (Signup/Login/Logout)
- Problem Listing and Filtering
- Code Submission and Evaluation
- User Profile and Submission History
- Admin Panel to Manage Problems

## 🧱 Tech Stack

- **Node.js** – Runtime
- **Express.js** – Server Framework
- **Prisma ORM** – Type-safe ORM to interact with PostgreSQL
- **Docker** – Containerize backend + database
- **Docker Compose** – Manage multi-container setup
- **PostgreSQL** – Relational Database
- **JWT** – Authentication
- **bcrypt** – Password hashing
- **dotenv** – Environment variable management

## 📁 Folder Structure

leetlab-backend/
├── controllers/ # Business logic for APIs
├── models/ # Mongoose schemas and models
├── routes/ # API route definitions
├── middlewares/ # Custom middleware (auth, error handlers, etc.)
├── utils/ # Helper functions (optional)
├── config/ # DB connection and environment setup
└── server.js # Entry point of the application (Express app setup)


## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/leetlab-backend.git
cd leetlab-backend
```

### 2. Install Dependencies
```
npm install
```

### 3. Run Docker
```
docker run --name leetcodeDB -e POSTGRES_USER=username -e POSTGRES_PASSWORD=leetcodepassword -p 5432:5432 -d postgres
```

### 4. Environment Variables
Create a .env file in the root folder and add the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
 
### 4. Run the Server
```
npm run dev
```

The server will run at: http://localhost:5000


## 🧾 Project Structure

- `utils/asyncHandler.js`: Handles async controller functions to avoid repetitive try-catch blocks.
- `utils/ApiResponse.js`: Standardized format for successful API responses.
- `utils/ApiError.js`: Custom error class to structure and enrich error information.
- `middlewares/errorHandler.js`: Centralized error handler middleware to catch all errors and return structured JSON responses.

## 📄 API Response Format

All API responses follow a consistent structure:

**Success:**
```json
{
  "statusCode": 200,
  "data": {...},
  "message": "Success",
  "success": true
}
```

**Error:**
```json
{
  "statusCode": 404,
  "data": null,
  "message": "User not found",
  "success": false
}
```

#### ⚠️ Error Handling
```md
## 🛠 Error Handling

All async controllers are wrapped using a custom `asyncHandler` utility to auto-forward errors to the centralized `errorHandler` middleware.

You can throw custom errors using:

throw new ApiError(404, "User not found");
```



## 📬 API Endpoints (Coming Soon)
POST /api/auth/register – Register a new user

POST /api/auth/login – Login with credentials

GET /api/problems – Fetch all coding problems

POST /api/submit – Submit a code solution

... more endpoints will be added as development progresses.


 ## 🙏 Acknowledgements
Inspired by platforms like LeetCode, HackerRank, and Codeforces.