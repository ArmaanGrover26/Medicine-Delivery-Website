-- Migration 001: Create users table
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  full_name     VARCHAR(255)        NOT NULL,
  email         VARCHAR(255) UNIQUE NOT NULL,
  phone_number  VARCHAR(20),
  password_hash VARCHAR(255)        NOT NULL,
  is_blocked    BOOLEAN             DEFAULT FALSE,
  role          VARCHAR(50)         DEFAULT 'user',
  created_at    TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP           DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
