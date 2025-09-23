const express = require('express');
const router = express.Router();
const pool = require('../db');

// In a real application, you would add a middleware here 
// to verify that the person making the request is an admin.

// GET all users for the admin panel
router.get('/users', async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT id, full_name, email, is_blocked, created_at FROM users ORDER BY created_at DESC");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// BLOCK a user
router.put('/users/:id/block', async (req, res) => {
    try {
        await pool.query("UPDATE users SET is_blocked = TRUE WHERE id = $1", [req.params.id]);
        res.json({ message: "User blocked successfully." });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// UNBLOCK a user
router.put('/users/:id/unblock', async (req, res) => {
    try {
        await pool.query("UPDATE users SET is_blocked = FALSE WHERE id = $1", [req.params.id]);
        res.json({ message: "User unblocked successfully." });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;