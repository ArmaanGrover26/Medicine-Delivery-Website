const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// === SIGN UP ROUTE ===
router.post('/signup', async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  try {
    // 1. Check if user already exists
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(409).json({ message: "User with this email already exists." });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Insert the new user into the database
    const newUser = await pool.query(
      "INSERT INTO users (full_name, email, phone_number, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, full_name, email",
      [fullName, email, phone, passwordHash]
    );

    res.status(201).json({ message: "User created successfully!", user: newUser.rows[0] });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// === LOGIN ROUTE ===
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // 2. Check if user is blocked
    if (user.rows[0].is_blocked) {
        return res.status(403).json({ message: "This account has been suspended." });
    }

    // 3. Compare the provided password with the stored hash
    const isValidPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // 4. Create and sign a JWT
    const payload = {
      user: {
        id: user.rows[0].id,
        name: user.rows[0].full_name,
        email: user.rows[0].email,
        phone: user.rows[0].phone_number
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Use the secret from your .env file
      { expiresIn: '3h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: payload.user });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;