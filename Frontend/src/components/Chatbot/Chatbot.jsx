import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hello! How can I assist you with your health questions today?' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Sending message to chatbot API...');

      // Add timeout to prevent infinite loading
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(`\${import.meta.env.VITE_API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API request failed');
      }

      const data = await response.json();
      console.log('Received response:', data);

      const botMessage = { sender: 'bot', text: data.reply || data.error || 'No response received' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);

      let errorText = 'Sorry, something went wrong. Please try again.';

      if (error.name === 'AbortError') {
        errorText = 'Request timed out. The AI is taking too long to respond. Please try again.';
      } else if (error.message) {
        errorText = error.message;
      }

      const errorMessage = { sender: 'bot', text: errorText };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-overlay">
      <div className="chatbot-window">
        <div className="chatbot-header">
          <h3>AI Pharmacist Assistant</h3>
          <button onClick={onClose} className="close-btn"><FaTimes /></button>
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isLoading && <div className="message-bubble bot loading"><span></span><span></span><span></span></div>}
          <div ref={chatEndRef} />
        </div>
        <form className="chatbot-input" onSubmit={handleSend}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;