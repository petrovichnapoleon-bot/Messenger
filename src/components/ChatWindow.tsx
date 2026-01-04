import React, { useState, useRef, useEffect } from 'react';
import './ChatWindow.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status?: 'sent' | 'pending' | 'failed';
}

interface ChatWindowProps {
  title?: string;
  placeholder?: string;
  onSendMessage?: (message: string) => void;
  messages?: Message[];
  isLoading?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  title = 'Chat',
  placeholder = 'Type a message...',
  onSendMessage,
  messages = [],
  isLoading = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date(),
        status: 'sent',
      };

      setLocalMessages((prev) => [...prev, newMessage]);
      onSendMessage?.(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2 className="chat-title">{title}</h2>
      </div>

      <div className="chat-messages">
        {localMessages.length === 0 ? (
          <div className="empty-state">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          localMessages.map((message) => (
            <div
              key={message.id}
              className={`message message-${message.sender}`}
            >
              <div className="message-content">
                <p className="message-text">{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              {message.status && (
                <span className={`message-status status-${message.status}`}>
                  {message.status === 'pending' && '⏳'}
                  {message.status === 'sent' && '✓'}
                  {message.status === 'failed' && '✗'}
                </span>
              )}
            </div>
          ))
        )}
        {isLoading && (
          <div className="message message-bot">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          className="chat-input"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button
          className="send-button"
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isLoading}
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
