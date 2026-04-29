# Football League Management System

A professional full-stack management platform designed for football tournament organizers. This project demonstrates a modern approach to sports data management, focusing on security, scalability, and clean software architecture.

## Key Highlights
- Full-Stack Integration: Seamless communication between a React frontend and an ASP.NET Core REST API.
- Robust Security: User authentication powered by JWT (JSON Web Tokens) and secure password storage using SHA-256 hashing.
- Professional UI/UX: Developed with Material UI (MUI) for a clean, responsive, and intuitive dashboard experience.
- Efficient Data Handling: Implementation of client-side pagination to ensure high performance and optimal resource management.
- Database Integrity: Relational database design with PostgreSQL, optimized for complex data entities and relationships.

## Tech Stack
- Frontend: React.js (Hooks, Functional Components), Material UI, Axios.
- Backend: .NET 8 / ASP.NET Core Web API.
- Database: PostgreSQL.
- Security: JWT Authentication, SHA-256 Password Hashing.
- Version Control: Git & GitHub.

## System Architecture
The application follows a decoupled architecture:
1. Presentation Layer (React): Manages application state and dynamic UI rendering.
2. API Layer (ASP.NET Core): Handles business logic, security middleware, and request routing.
3. Data Layer (PostgreSQL): Ensures persistent, relational data storage and integrity.

## Project Structure
- /football-frontend: React source code and UI components.
- /FootballApi: Backend controllers, models, and authentication logic.
- /db: Database initialization and schema scripts.

## Installation and Setup
1. Database: Initialize the local PostgreSQL instance using the script provided in /db/init.sql.
2. Backend:
   - Navigate to /FootballApi.
   - Configure the connection string in appsettings.json.
   - Execute 'dotnet run'.
3. Frontend:
   - Navigate to /football-frontend.
   - Execute 'npm install' and 'npm start'.

---
Developed as a demonstration of professional software engineering principles and modern web development practices.