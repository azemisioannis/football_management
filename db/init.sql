/* ==========================================================================
   FILE: init.sql (FINAL CORRECTED VERSION)
   DESCRIPTION: Δημιουργία βάσης χωρίς περιορισμούς Μίας Λίγκας ανά χρήστη.
   ========================================================================== */

-- 1. ΚΑΘΑΡΙΣΜΑ
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS leagues CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS player_position CASCADE;

-- 2. ΔΗΜΙΟΥΡΓΙΑ ΤΥΠΩΝ (ENUMS)
CREATE TYPE user_role AS ENUM ('admin', 'league_organizer', 'team_manager');
CREATE TYPE player_position AS ENUM ('GK', 'DF', 'MF', 'FW');

-- 3. ΠΙΝΑΚΑΣ ΧΡΗΣΤΩΝ
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. ΠΙΝΑΚΑΣ ΛΙΓΚΩΝ
CREATE TABLE leagues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE, 
    region VARCHAR(50) NOT NULL,
    user_id INT, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_league_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 5. ΠΙΝΑΚΑΣ ΟΜΑΔΩΝ
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    league_id INT,
    user_id INT, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_team_league FOREIGN KEY (league_id) REFERENCES leagues(id) ON DELETE SET NULL,
    CONSTRAINT fk_team_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 6. ΠΙΝΑΚΑΣ ΠΑΙΚΤΩΝ
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    position player_position NOT NULL,
    team_id INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_player_team FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- 7. ΕΥΡΕΤΗΡΙΑ (INDEXES)
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_teams_user ON teams(user_id);
CREATE INDEX idx_leagues_user ON leagues(user_id);