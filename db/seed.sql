/* ==========================================================================
   SEED DATA: Greek Football Federation (EPS) Management System
   VERSION: 2.0 (Compatible with new User-Linked Schema)
   ========================================================================== */

-- 1. ΕΙΣΑΓΩΓΗ TEST USERS (Password: password123)
INSERT INTO users (username, password_hash, role) VALUES 
('athens_admin', 'pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=', 'league_organizer'),
('kifisia_manager', 'pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=', 'team_manager'),
('pao_manager', 'pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=', 'team_manager'),
('super_admin', 'pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=', 'admin')
ON CONFLICT (username) DO NOTHING;

-- 2. ΕΙΣΑΓΩΓΗ ΛΙΓΚΩΝ (Συνδεδεμένες με τον athens_admin)
INSERT INTO leagues (name, region, user_id) VALUES 
('ΕΠΣ ΑΘΗΝΩΝ', 'ΑΤΤΙΚΗ', (SELECT id FROM users WHERE username = 'athens_admin'))
ON CONFLICT (name) DO NOTHING;

-- 3. ΕΙΣΑΓΩΓΗ ΟΜΑΔΩΝ (Συνδεδεμένες με τους αντίστοιχους managers)
INSERT INTO teams (name, city, league_id, user_id) VALUES 
('Α.Ο. ΚΗΦΙΣΙΑ', 'ΚΗΦΙΣΙΑ', 
    (SELECT id FROM leagues WHERE name = 'ΕΠΣ ΑΘΗΝΩΝ'), 
    (SELECT id FROM users WHERE username = 'kifisia_manager')),
('ΠΑΝΙΩΝΙΟΣ', 'ΝΕΑ ΣΜΥΡΝΗ', 
    (SELECT id FROM leagues WHERE name = 'ΕΠΣ ΑΘΗΝΩΝ'), 
    (SELECT id FROM users WHERE username = 'pao_manager'))
ON CONFLICT DO NOTHING;

-- 4. ΕΙΣΑΓΩΓΗ ΠΑΙΚΤΩΝ
INSERT INTO players (first_name, last_name, position, team_id) VALUES 
('Γιώργος', 'Παπαδόπουλος', 'GK', (SELECT id FROM teams WHERE name = 'Α.Ο. ΚΗΦΙΣΙΑ')),
('Νίκος', 'Καραπάνος', 'FW', (SELECT id FROM teams WHERE name = 'Α.Ο. ΚΗΦΙΣΙΑ')),
('Δημήτρης', 'Σπύρου', 'MF', (SELECT id FROM teams WHERE name = 'ΠΑΝΙΩΝΙΟΣ')),
('Κώστας', 'Φωτίου', 'DF', (SELECT id FROM teams WHERE name = 'ΠΑΝΙΩΝΙΟΣ'));