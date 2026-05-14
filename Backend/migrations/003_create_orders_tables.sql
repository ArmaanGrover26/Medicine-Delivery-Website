-- Migration 003: Create orders and order_items tables
CREATE TABLE IF NOT EXISTS orders (
  id               SERIAL PRIMARY KEY,
  user_id          INTEGER        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_amount     NUMERIC(10, 2) NOT NULL,
  shipping_name    VARCHAR(255),
  shipping_address TEXT,
  shipping_phone   VARCHAR(20),
  status           VARCHAR(50)    DEFAULT 'Order Placed',
  tracking_number  VARCHAR(100),
  estimated_delivery TIMESTAMP,
  delivered_at     TIMESTAMP,
  order_date       TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id    ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_date ON orders(order_date);

-- -------------------------------------------------------

CREATE TABLE IF NOT EXISTS order_items (
  id                SERIAL PRIMARY KEY,
  order_id          INTEGER        NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id        INTEGER        REFERENCES products(id) ON DELETE SET NULL,
  quantity          INTEGER        NOT NULL DEFAULT 1,
  price_at_purchase NUMERIC(10, 2) NOT NULL,
  product_name      VARCHAR(255),
  product_category  VARCHAR(100),
  created_at        TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
