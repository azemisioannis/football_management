# Football League Management System (Full-Stack)

A  management platform for football leagues, built with a modern decoupled architecture. This project integrates a React-based frontend with an ASP.NET Core REST API and a PostgreSQL database.

## Project Architecture
The solution is organized into three main layers:

1.  **Frontend (React):** Located in `/football-frontend`. Developed with Material UI for a responsive and intuitive user interface.
2.  **Backend (ASP.NET Core):** Located in `/FootballApi`. A RESTful API handling business logic, authentication, and data persistence.
3.  **Database (PostgreSQL):** Scripts for schema initialization are located in the `/db` directory.

## Core Features
- **Security:** User authentication using JWT (JSON Web Tokens) and password hashing with SHA-256.
- **League Management:** Full CRUD operations for managing football leagues and teams.
- **Performance:** Optimized data fetching with client-side pagination.
- **Architecture:** Clean separation of concerns between frontend and backend services.

## Technical Stack
- **Client:** React.js, Material UI, Axios, React Router.
- **Server:** .NET 8, ASP.NET Core Web API.
- **Storage:** PostgreSQL.
- **Security:** SHA-256 Hashing, JWT Bearer Authentication.

## Setup and Installation

### 1. Database Setup
- Execute the SQL initialization scripts found in `/db/init.sql` on your PostgreSQL instance.

### 2. Backend Configuration
- Navigate to the `FootballApi` directory.
- Update the connection string in `appsettings.json` to match your local database credentials.
- Run the following commands:
  dotnet restore
  dotnet run
### 3. Frontend Configuration
- Navigate to the `Football-frontend` directory.
- Install the required dependancies and start the development server: 
    npm install
    npm start