# 🔐 AuthAssesment

A full-stack authentication application built with React, C#, PostgreSQL, and Docker.

> **Live Demo:** [https://auth-client-zywh.onrender.com](https://auth-client-zywh.onrender.com)
> 
> **Figma Design:** [https://www.figma.com/community/file/1613114749630048577/auth-assesment](https://www.figma.com/community/file/1613114749630048577/auth-assesment)
> 
> **Postman Collection:** [View Collection](https://www.postman.com/cloudy-sunset-574325/api-auth-assesment)
> 
> [![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/cloudy-sunset-574325/api-auth-assesment)

📥 **[Download Postman Collection](./AuthAPI/Postman%20Collection/AuthAssesment.postman_collection.json)**

---

## 📸 Screenshots

| Login | Register | Profile | 404 |
|-------|----------|---------|-----|
| ![Login](./AuthClient/src/assets/LoginBG.jpg) | ![Register](./AuthClient/src/assets/RegisterBG.jpg) | ![Profile](./AuthClient/src/assets/ProfileBG.jpg) | ![NotFound](./AuthClient/src/assets/404BG.jpg) |

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript + Vite + Tailwind CSS |
| Backend | C# ASP.NET Core Web API |
| ORM | Entity Framework Core + Npgsql |
| Database | PostgreSQL |
| Auth | JWT (JSON Web Tokens) |
| Validation | Zod (frontend) |
| Containerisation | Docker + Docker Compose |
| Testing | xUnit + Moq |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                Docker Compose                   │
│                                                 │
│  ┌──────────────┐     ┌──────────────────────┐  │
│  │   React App  │────▶│   C# ASP.NET API     │  │
│  │   (nginx:80) │     │   (Port 5019)        │  │
│  └──────────────┘     └──────────┬───────────┘  │
│                                  │              │
│                       ┌──────────▼───────────┐  │
│                       │   PostgreSQL         │  │
│                       │   (Port 5432)        │  │
│                       └──────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

Choose how you want to run the project:

- [🐳 Run with Docker](#-run-with-docker) ← recommended
- [💻 Run Locally without Docker](#-run-locally-without-docker)

---

## 🐳 Run with Docker

### Prerequisites
- [Docker Desktop](https://docs.docker.com/get-started/get-docker/)
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/Bethhelemuel/AuthAssesment.git
cd AuthAssesment
```

### 2. Set up environment files

Rename the example env files:

```bash
# Windows
copy .env.example .env
copy AuthClient\.env.example AuthClient\.env

# Mac/Linux
cp .env.example .env
cp AuthClient/.env.example AuthClient/.env
```

Then open the root `.env` and fill in your values:

```env
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=authdb
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
JWT_SECRET=longandsecuresecretkey
JWT_ISSUER=AuthAPI
JWT_AUDIENCE=AuthClient
JWT_EXPIRATIONDAYS=7
```

The `AuthClient/.env` is pre-configured for Docker and does not need to be changed.

### 3. Run with Docker

```bash
docker-compose up --build
```

### 4. Open the app

| Service | URL |
|---------|-----|
| Frontend | http://localhost:8085 |
| API | http://localhost:5019 |

---

## 💻 Run Locally without Docker

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8)
- [Node.js 20+](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)

### 1. Clone the repository

```bash
git clone https://github.com/Bethhelemuel/AuthAssesment.git
cd AuthAssesment
```

### 2. Set up the database

Create a PostgreSQL database called `authdb` then open `AuthAPI/appsettings.json` and update with your own credentials:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Database=authdb;Username=postgres;Password=your-password"
},
"JwtSettings": {
  "SecretKey": "your-secret-key-here",
  "Issuer": "AuthAPI",
  "Audience": "AuthAPIUsers",
  "ExpiryDays": 1
}
```

### 3. Run the API

```bash
cd AuthAPI
dotnet restore
dotnet ef database update
dotnet run
```

API will be available at `http://localhost:5019`

### 4. Set up the frontend environment

Rename the example env file:

```bash
# Windows
copy AuthClient\.env.example AuthClient\.env

# Mac/Linux
cp AuthClient/.env.example AuthClient/.env
```

The default `AuthClient/.env` is already configured for local development:

```env
VITE_API_URL=http://localhost:5019/api
```

### 5. Run the frontend

```bash
cd AuthClient
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/auth/register` | ❌ | Register a new user |
| POST | `/api/auth/login` | ❌ | Login and receive JWT |
| GET | `/api/user/profile` | ✅ Bearer Token | Get authenticated user details |

### Example Requests

**Register**
```json
POST /api/auth/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Login**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Get Profile**
```
GET /api/user/profile
Authorization: Bearer <your_jwt_token>
```

---

## 🧪 Running Tests

```bash
cd AuthAPI.Tests
dotnet test
```

### Test Coverage

| File | Type | Tests |
|------|------|-------|
| `PasswordHasherTests.cs` | Unit | BCrypt hashing + verification |
| `JwtServiceTests.cs` | Unit | Token generation + claims |
| `AuthServiceTests.cs` | Unit | Register + Login logic |
| `AuthControllerTests.cs` | Integration | Auth endpoints full HTTP flow |
| `UserControllerTests.cs` | Integration | Profile endpoint + JWT auth |

---

## 📁 Project Structure

```
AuthAssesment/
├── AuthAPI/                  # C# ASP.NET Core Web API
│   ├── Controllers/          # Auth + User controllers
│   ├── Services/             # AuthService + JwtService + UserService
│   ├── Models/               # User model
│   ├── DTOs/                 # Request/Response DTOs
│   ├── Interface/            # Service interfaces
│   ├── Data/                 # AppDbContext (EF Core)
│   ├── Middleware/           # Exception handling middleware
│   └── Dockerfile
├── AuthAPI.Tests/            # Unit + Integration tests
│   ├── Unit/
│   │   ├── AuthServiceTests.cs
│   │   ├── JwtServiceTests.cs
│   │   └── PasswordHasherTests.cs
│   └── Integration/
│       ├── AuthControllerTests.cs
│       └── UserControllerTests.cs
├── AuthClient/               # React + TypeScript frontend
│   ├── src/
│   │   ├── api/              # Axios instance
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # AuthContext (JWT storage)
│   │   ├── pages/            # Auth + Profile pages
│   │   └── assets/           # Images
│   ├── .env.example          # Copy to .env for local development
│   └── Dockerfile
├── docker-compose.yml
├── .env.example              # Copy to .env and fill in your values
└── README.md
```

---

## 🔒 Security

- Passwords are hashed using **BCrypt** before storage
- Authentication uses **JWT tokens** with configurable expiry
- Protected routes require a valid Bearer token
- Environment variables used for all secrets — never hardcoded
- `.env` files are excluded from version control

---

## 👤 Author

**Thato Mphugo**

---
 
## 📄 License

This project was built as part of a technical assessment.