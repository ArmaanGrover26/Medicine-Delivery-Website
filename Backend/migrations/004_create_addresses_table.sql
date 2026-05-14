-- Migration 004: Create addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  full_name    VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20)  NOT NULL,
  address_line TEXT         NOT NULL,
  pincode      VARCHAR(10)  NOT NULL,
  state        VARCHAR(100) NOT NULL,
  address_type VARCHAR(50)  DEFAULT 'Home',
  created_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON addresses(user_id);
