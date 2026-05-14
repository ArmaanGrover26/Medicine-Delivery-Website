const express = require('express');
const router = express.Router();
const pool = require('../db');

// USER MANAGEMENT ROUTES


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



// ORDER MANAGEMENT ROUTES 

// GET all orders (with user email)
router.get('/orders', async (req, res) => {
    try {
        // Join orders with users to get the email of the person who placed the order
        const allOrders = await pool.query(`
            SELECT o.id, o.total_amount, o.status, o.order_date, o.shipping_name, o.shipping_address, u.email 
            FROM orders o 
            JOIN users u ON o.user_id = u.id 
            ORDER BY o.order_date DESC
        `);
        res.json(allOrders.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// UPDATE order status
router.put('/orders/:id/status', async (req, res) => {
    const { status } = req.body; // e.g. "Shipped", "Delivered", "Cancelled"
    try {
        await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [status, req.params.id]);
        res.json({ message: "Order status updated." });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// PRODUCT MANAGEMENT ROUTES

// GET all products (for admin)
router.get('/products', async (req, res) => {
    try {
        const allProducts = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
        res.json(allProducts.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// ADD a new product
router.post('/products', async (req, res) => {
    try {
        const {
            name, category, subcategory, price, originalPrice, discount,
            description, image, manufacturer, unitsAvailable, rxRequired,
            dosage, sideEffects, precautions, status
        } = req.body;

        const newProduct = await pool.query(
            `INSERT INTO products (
                name, category, subcategory, price, original_price, discount,
                description, image, manufacturer, units_available, rx_required,
                dosage, side_effects, precautions, status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            RETURNING *`,
            [name, category, subcategory, price, originalPrice, discount,
                description, image, manufacturer, unitsAvailable, rxRequired,
                dosage, sideEffects, precautions, status]
        );

        res.json(newProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// UPDATE a product
router.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name, category, subcategory, price, originalPrice, discount,
            description, image, manufacturer, unitsAvailable, rxRequired,
            dosage, sideEffects, precautions, status
        } = req.body;

        const updatedProduct = await pool.query(
            `UPDATE products SET
                name = $1, category = $2, subcategory = $3, price = $4,
                original_price = $5, discount = $6, description = $7, image = $8,
                manufacturer = $9, units_available = $10, rx_required = $11,
                dosage = $12, side_effects = $13, precautions = $14, status = $15,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $16
            RETURNING *`,
            [name, category, subcategory, price, originalPrice, discount,
                description, image, manufacturer, unitsAvailable, rxRequired,
                dosage, sideEffects, precautions, status, id]
        );

        if (updatedProduct.rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(updatedProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// DELETE a product (soft delete by setting is_active to false)
router.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("UPDATE products SET is_active = FALSE WHERE id = $1", [id]);
        res.json({ message: "Product deleted successfully." });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;