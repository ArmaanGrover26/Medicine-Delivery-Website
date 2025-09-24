const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize the Google AI client (if you have a key)
const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;


// --- API Routes ---
// Import all the route files we have created
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const orderRoutes = require('./routes/orders');

// Tell the server to use these routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);


// --- Gemini Chatbot Route ---
app.post('/api/chat', async (req, res) => {
  if (!genAI) {
    return res.status(503).json({ error: "AI Service is not configured." });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `You are a helpful and knowledgeable pharmacist assistant for a website called HealthMeds. Provide concise, safe, and general health advice. Do not provide specific medical diagnoses or prescriptions. The user's question is: "${message}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Sorry, I'm having trouble connecting to the AI assistant right now." });
  }
});


// --- Start Server ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});