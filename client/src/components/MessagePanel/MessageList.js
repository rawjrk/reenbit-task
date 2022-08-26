import React from 'react';
import Message from './Message';
import './MessageList.css';

const MessageList = ({ messages, currentUserId, userPicUrl = null }) => (
  <div id="message-list">
    {messages.map((msg, i) => {
      const isIncoming = msg.toUser === currentUserId;
      return (
        <Message
          key={i}
          text={msg.text}
          sentOn={msg.sentOn}
          isIncoming={isIncoming}
          userPicUrl={userPicUrl}
        />
      );
    })}
  </div>
);

export default MessageList;
