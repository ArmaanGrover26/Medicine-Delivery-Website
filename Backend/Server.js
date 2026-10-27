const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// CORS — allow credentials (cookies) from the frontend
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://medicine-delivery-website.vercel.app"
  ],
  credentials: true,
}));

// Parse cookies from every incoming request
app.use(cookieParser());
app.use(express.json());


// --- API Routes ---
// Import all the route files we have created
const userRoutes         = require('./routes/users');
const adminRoutes        = require('./routes/admin');
const orderRoutes        = require('./routes/orders');
const addressRoutes      = require('./routes/addresses');
const productRoutes      = require('./routes/products');
const prescriptionRoutes = require('./routes/prescriptions');
const chatRoutes         = require('./routes/chat'); // RAG-powered chat
const deliveryRoutes     = require('./routes/delivery');

// Tell the server to use these routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/products', productRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/chat', chatRoutes); // RAG chat replaces inline handler
app.use('/api/delivery', deliveryRoutes);


// --- Start Server ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});