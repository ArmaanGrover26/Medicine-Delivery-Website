const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize the Google AI client with your API key from the .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the API endpoint for your chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body; // Get the user's message from the frontend

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get the Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    // A simple prompt to give the AI context
    const prompt = `You are a helpful and knowledgeable pharmacist assistant for a website called HealthMeds. Provide concise, safe, and general health advice. Do not provide specific medical diagnoses or prescriptions. The user's question is: "${message}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Send the AI's response back to the frontend
    res.json({ reply: text });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Sorry, I'm having trouble connecting to the AI assistant right now." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});