import React, { useEffect, useRef } from 'react';

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  avatar?: string;
  isOwn?: boolean;
}

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  onLoadMore?: () => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading = false,
  onLoadMore,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const renderMessageGroup = (currentMessage: Message, previousMessage?: Message) => {
    const showDate =
      !previousMessage ||
      formatDate(currentMessage.timestamp) !== formatDate(previousMessage.timestamp);

    return (
      <React.Fragment key={currentMessage.id}>
        {showDate && (
          <div className="message-date-divider">
            <span className="date-label">{formatDate(currentMessage.timestamp)}</span>
          </div>
        )}
        <div
          className={`message-item ${currentMessage.isOwn ? 'message-own' : 'message-other'}`}
        >
          {!currentMessage.isOwn && currentMessage.avatar && (
            <img src={currentMessage.avatar} alt={currentMessage.author} className="avatar" />
          )}
          <div className="message-content-wrapper">
            {!currentMessage.isOwn && (
              <div className="message-author">{currentMessage.author}</div>
            )}
            <div className="message-bubble">
              <p className="message-text">{currentMessage.content}</p>
              <span className="message-time">{formatTime(currentMessage.timestamp)}</span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className="message-list-container" ref={messagesContainerRef}>
      {isLoading && (
        <div className="message-loading">
          <div className="loading-spinner"></div>
          <p>Loading messages...</p>
        </div>
      )}

      {messages.length === 0 && !isLoading && (
        <div className="message-empty-state">
          <p>No messages yet. Start a conversation!</p>
        </div>
      )}

      <div className="messages-wrapper">
        {messages.map((message, index) => {
          const previousMessage = index > 0 ? messages[index - 1] : undefined;
          return renderMessageGroup(message, previousMessage);
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
