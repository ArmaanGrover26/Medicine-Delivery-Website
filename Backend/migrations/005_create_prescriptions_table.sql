-- Migration 005: Create prescriptions table
CREATE TABLE IF NOT EXISTS prescriptions (
  id            SERIAL PRIMARY KEY,
  user_id       INTEGER      REFERENCES users(id) ON DELETE SET NULL,
  filename      VARCHAR(500) NOT NULL,
  original_name VARCHAR(500),
  file_size     INTEGER,
  file_path     TEXT,
  status        VARCHAR(50)  DEFAULT 'pending',
  uploaded_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_prescriptions_user_id ON prescriptions(user_id);
