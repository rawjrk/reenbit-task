import React from 'react';
import Message from './Message';
import './MessageList.css';

const MessageList = ({ messages, currentUserId }) => (
  <div id="message-list">
    {messages.map((msg, i) => (
      <Message
        key={i}
        text={msg.text}
        sentOn={msg.sentOn}
        isCurrentUser={msg.fromUser === currentUserId}
      />
    ))}
  </div>
);

export default MessageList;
