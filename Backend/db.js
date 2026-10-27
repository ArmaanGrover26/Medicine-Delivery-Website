const { Pool } = require('pg');
require('dotenv').config();

// SSL is only needed in production (e.g., Render, Heroku).
// Local PostgreSQL does not use SSL — enabling it causes a connection error.
const pool = new Pool({
  user:     process.env.DB_USER,
  host:     process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port:     process.env.DB_PORT,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
});

module.exports = pool;