import React from 'react';
import Message from './Message';
import './MessageList.css';

const MessageList = ({ messages, currentUserId }) => (
  <div id="message-list">
    {messages.map((msg, i) => (
      <Message
        key={i}
        text={msg.text}
        date={msg.date}
        isCurrentUser={msg.userId === currentUserId}
      />
    ))}
  </div>
);

export default MessageList;
