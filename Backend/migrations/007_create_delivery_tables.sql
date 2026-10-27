-- Migration 007: Add delivery partner support to orders and create delivery_profiles table

-- 1. Add delivery partner fields to orders table
ALTER TABLE orders 
  ADD COLUMN IF NOT EXISTS delivery_partner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS delivery_otp VARCHAR(6),
  ADD COLUMN IF NOT EXISTS picked_up_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS delivery_notes TEXT;

CREATE INDEX IF NOT EXISTS idx_orders_delivery_partner_id ON orders(delivery_partner_id);

-- 2. Create delivery_profiles table
CREATE TABLE IF NOT EXISTS delivery_profiles (
  id               SERIAL PRIMARY KEY,
  user_id          INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  vehicle_type     VARCHAR(50)  DEFAULT 'Motorcycle',
  vehicle_number   VARCHAR(50),
  driving_license  VARCHAR(100),
  city             VARCHAR(100) DEFAULT 'Delhi NCR',
  is_approved      BOOLEAN      DEFAULT TRUE,
  is_online        BOOLEAN      DEFAULT TRUE,
  current_lat      NUMERIC(10, 7),
  current_lng      NUMERIC(10, 7),
  total_deliveries INTEGER      DEFAULT 0,
  created_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_delivery_profiles_user_id ON delivery_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_delivery_profiles_status ON delivery_profiles(is_online, is_approved);
