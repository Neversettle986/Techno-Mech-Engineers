"use client";
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Sparkles } from 'lucide-react';
import ClickSpark from './ClickSpark';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';
import { COMPANY_NAME, PRODUCTS, SERVICES, COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_EMAIL } from '../constants';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am the AI assistant for Techno Mech Engineers. How can I assist you with our precision engineering products or services today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && !isLoading) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isLoading]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const generateContext = () => {
    const productList = PRODUCTS.map(p => `- ${p.name} (${p.category}): ${p.description}`).join('\n');
    const serviceList = SERVICES.map(s => `- ${s.title}: ${s.description}`).join('\n');

    return `
    You are an AI sales engineer for ${COMPANY_NAME}.
    
    Company Info:
    Name: ${COMPANY_NAME}
    Addr: ${COMPANY_ADDRESS}
    Phone: ${COMPANY_PHONE}
    Email: ${COMPANY_EMAIL}
    
    Products:
    ${productList}
    
    Services:
    ${serviceList}
    
    Goal: Answer customer queries instantly and accurately.
    
    CRITICAL INSTRUCTIONS FOR SPEED:
    1. KEEP RESPONSES UNDER 3 SENTENCES unless a detailed technical spec is requested.
    2. BE DIRECT. Do not fluff.
    3. If asked for price -> "Please contact us for a quote."
    4. Speak professionally but concisely.
    `;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Robust API Key retrieval for local vs cloud environments
      let apiKey = '';

      // 1. Try standard process.env.API_KEY
      try {
        if (process.env.API_KEY) apiKey = process.env.API_KEY;
      } catch (e) { }

      // 2. Fallback to NEXT_PUBLIC_GEMINI_API_KEY (User's local .env variable)
      if (!apiKey) {
        try {
          if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        } catch (e) { }
      }

      if (!apiKey) {
        throw new Error("API Key is missing. Please check your .env file.");
      }

      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        config: {
          systemInstruction: generateContext(),
        },
        contents: [
          ...messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: userMessage.text }] }
        ],
      });

      const text = response.text || "I apologize, could you please repeat that?";

      setMessages(prev => [...prev, { role: 'model', text }]);

    } catch (error: any) {
      console.error("Chat error:", error);
      let errorMessage = "Connection error. Please contact us directly.";

      if (error.message && (error.message.includes("API Key") || error.message.includes("API_KEY"))) {
        errorMessage = "System Error: API Key not configured correctly.";
      } else if (error.message && (error.message.includes("404") || error.message.includes("not found"))) {
        errorMessage = "API Error: Model not found or API key restricted. Please enable Generative Language API.";
      } else if (error.message && error.message.includes("503")) {
        errorMessage = "System Error: Model service overloaded. Please try again.";
      }

      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Toggle Button Container - Fixed Position */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? 'rotate-90' : 'hover:-translate-y-1'}`}>
        <div className="rounded-full shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95">
          <ClickSpark sparkColor="#DC143C" sparkSize={10} sparkRadius={25} sparkCount={8} duration={400}>
            <button
              ref={toggleButtonRef}
              onClick={() => setIsOpen(!isOpen)}
              className={`p-4 rounded-full transition-colors duration-200 ${isOpen ? 'bg-slate-900' : 'bg-[#DC143C] hover:bg-[#B01030]'
                }`}
            >
              {isOpen ? <X className="text-white" /> : <MessageSquare className="text-white" />}
            </button>
          </ClickSpark>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatbotRef}
          className="fixed bottom-24 right-6 w-96 h-[600px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-[#DC143C]/10 animate-fade-in-up origin-bottom-right"
        >

          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center relative">
              <Bot className="text-[#DC143C]" size={24} />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Engineer AI</h3>
              <p className="text-slate-400 text-xs flex items-center gap-1">
                <Sparkles size={10} className="text-[#DC143C]" />
                Powered by Techno Mech Engineers</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm ${msg.role === 'user'
                    ? 'bg-[#DC143C] text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-gray-100 rounded-bl-none'
                    }`}
                >
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className="mb-1 last:mb-0">{line}</p>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center gap-3">
                  <Loader2 className="animate-spin text-[#DC143C]" size={20} />
                  <span className="text-xs text-slate-500 font-medium animate-pulse">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-[#DC143C] focus-within:ring-1 focus-within:ring-[#DC143C] transition-all">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about our specs..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder-slate-400"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="p-2 bg-[#DC143C] rounded-full text-white hover:bg-[#B01030] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;