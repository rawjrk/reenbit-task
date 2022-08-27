import React from 'react';
import Message from './Message';
import './MessageList.css';

const MessageList = ({ messages, currentUserId, userPicUrl = null, lastMessageRef }) => (
  <div id="message-list">
    {messages.map((msg, i) => {
      const isIncoming = msg.toUser === currentUserId;
      return (
        <Message
          ref={(i === messages.lenth - 1) ? null : lastMessageRef}
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
