import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

function MentalHealthChatbot() {
  const [messages, setMessages] = useState([
    { 
      text: "Hello, I'm PINGU. How can I support you today?", 
      sender: 'ai',
      avatar: '🤖'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [assistantStatus, setAssistantStatus] = useState('Ready');
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.lang = 'en-US';
        
        recognitionRef.current.onstart = () => {
          setIsListening(true);
          setAssistantStatus('Listening...');
        };

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputMessage(transcript);
          sendMessage(transcript);
          setIsListening(false);
          setAssistantStatus('Processing...');
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          setAssistantStatus('Error');
        };
      }

      synthesisRef.current = window.speechSynthesis;
    }
  }, []);

  // Start voice recognition
  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  // Text-to-Speech for AI responses
  const speakResponse = (text) => {
    if (synthesisRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Select a natural-sounding female voice
      const voices = synthesisRef.current.getVoices();
      const femaleVoices = voices.filter(voice => 
        voice.name.includes('Susan') || 
        voice.name.includes('Kate') || 
        voice.name.includes('Samantha') || 
        voice.gender === 'female'
      );
      
      utterance.voice = femaleVoices[0] || voices[0];
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      
      setIsSpeaking(true);
      setAssistantStatus('Speaking');
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setAssistantStatus('Ready');
      };
      
      synthesisRef.current.speak(utterance);
    }
  };

  const sendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = { 
      text: messageText, 
      sender: 'user',
      avatar: '👤'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setAssistantStatus('Thinking...');

    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText })
      });

      const data = await response.json();
      const aiMessage = { 
        text: data.response, 
        sender: 'ai',
        avatar: '👩‍⚕️',
        type: data.type || 'standard'
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Automatically speak AI response
      speakResponse(data.response);
    } catch (error) {
      const errorMessage = { 
        text: "I'm having trouble responding right now. Would you like to try again?", 
        sender: 'ai',
        avatar: '👩‍⚕️',
        type: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
      setAssistantStatus('Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="siri-mental-health-assistant">
      <div className="assistant-container">
        <div className="assistant-header">
          <div className="assistant-info">
            <div className="assistant-avatar">👩‍⚕️</div>
            <div className="assistant-details">
              <h1>PINGU</h1>
              <p>{assistantStatus}</p>
            </div>
          </div>
        </div>
        
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.sender} ${msg.type || ''}`}
            >
              <div className="message-avatar">{msg.avatar}</div>
              <div className="message-content">
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chat-input-container">
          <div className="chat-input">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Talk to PINGU..."
            />
            <div className="input-actions">
              <button 
                onClick={startListening} 
                className={`voice-btn ${isListening ? 'listening' : ''}`}
                title="Voice Input"
              >
                {isListening ? (
                  <div className="listening-wave">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : (
                  '🎙️'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="crisis-support">
        <h3>🚨 Emergency Support</h3>
        <div className="crisis-resources">
          <a href="tel:91-9820466726">National Suicide Prevention Lifeline: 91-9820466726</a>
          <a href="sms:741741">Crisis Text Line: Text HOME to 741741</a>
        </div>
      </div>
    </div>
  );
}

function client() {
  const root = createRoot(document.getElementById('root'));
  root.render(<MentalHealthChatbot />);
}

if (typeof document !== 'undefined') {
  client();
}
