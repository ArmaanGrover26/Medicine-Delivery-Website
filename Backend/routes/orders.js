const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

// === CREATE A NEW ORDER ===
// This is a protected route, so we add the authMiddleware
router.post('/', authMiddleware, async (req, res) => {
  const { userId, cartItems, cartTotal, shippingAddress } = req.body;
  const client = await pool.connect(); // Get a client from the pool for transaction

  try {
    // Start a transaction
    await client.query('BEGIN');

    // 1. Insert into the main 'orders' table
    const orderQuery = `
      INSERT INTO orders (user_id, total_amount, shipping_name, shipping_address, shipping_phone) 
      VALUES ($1, $2, $3, $4, $5) RETURNING id
    `;
    const orderValues = [userId, cartTotal, shippingAddress.name, shippingAddress.address, shippingAddress.phone];
    const newOrder = await client.query(orderQuery, orderValues);
    const orderId = newOrder.rows[0].id;

    // 2. Insert each cart item into the 'order_items' table
    for (const item of cartItems) {
      const itemQuery = `
        INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
        VALUES ($1, $2, $3, $4)
      `;
      const itemValues = [orderId, item.id, item.quantity, item.price];
      await client.query(itemQuery, itemValues);
    }

    // If everything is successful, commit the transaction
    await client.query('COMMIT');
    res.status(201).json({ message: 'Order placed successfully!', orderId: orderId });

  } catch (err) {
    // If anything fails, roll back the transaction
    await client.query('ROLLBACK');
    console.error(err.message);
    res.status(500).send('Server Error');
  } finally {
    // Release the client back to the pool
    client.release();
  }
});

// === GET ORDERS FOR A LOGGED-IN USER ===
router.get('/', authMiddleware, async (req, res) => {
    try {
        // req.user.id comes from the authMiddleware
        const userOrders = await pool.query("SELECT * FROM orders WHERE user_id = $1 ORDER BY order_date DESC", [req.user.id]);
        res.json(userOrders.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;