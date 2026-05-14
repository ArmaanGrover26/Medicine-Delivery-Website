const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

// GET all addresses for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query(
            'SELECT * FROM addresses WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).json({ message: 'Server error while fetching addresses' });
    }
});

// POST - Add a new address
router.post('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { fullName, phoneNumber, addressLine, pincode, state, addressType } = req.body;

        // Validate required fields
        if (!fullName || !phoneNumber || !addressLine || !pincode || !state) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const result = await pool.query(
            `INSERT INTO addresses (user_id, full_name, phone_number, address_line, pincode, state, address_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
            [userId, fullName, phoneNumber, addressLine, pincode, state, addressType || 'Home']
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding address:', error);
        res.status(500).json({ message: 'Server error while adding address' });
    }
});

// PUT - Update an address
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.id;
        const { fullName, phoneNumber, addressLine, pincode, state, addressType } = req.body;

        // Check if address belongs to user
        const checkResult = await pool.query(
            'SELECT * FROM addresses WHERE id = $1 AND user_id = $2',
            [addressId, userId]
        );

        if (checkResult.rows.length === 0) {
            return res.status(404).json({ message: 'Address not found' });
        }

        const result = await pool.query(
            `UPDATE addresses 
       SET full_name = $1, phone_number = $2, address_line = $3, 
           pincode = $4, state = $5, address_type = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 AND user_id = $8
       RETURNING *`,
            [fullName, phoneNumber, addressLine, pincode, state, addressType, addressId, userId]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).json({ message: 'Server error while updating address' });
    }
});

// DELETE - Delete an address
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.id;

        const result = await pool.query(
            'DELETE FROM addresses WHERE id = $1 AND user_id = $2 RETURNING *',
            [addressId, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.json({ message: 'Address deleted successfully', address: result.rows[0] });
    } catch (error) {
        console.error('Error deleting address:', error);
        res.status(500).json({ message: 'Server error while deleting address' });
    }
});

module.exports = router;
