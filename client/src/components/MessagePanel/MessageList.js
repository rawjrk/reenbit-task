import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { messageSchema } from '../../utils/schemas';
import Message from './Message';
import './MessageList.css';

const MessageList = forwardRef((props, lastMessageRef) => {
  const { messages, currentUserId, userPicUrl } = props;

  return (
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
});

MessageList.propTypes = {
  messages: PropTypes.arrayOf(messageSchema).isRequired,
  currentUserId: PropTypes.string.isRequired,
  userPicUrl: PropTypes.string.isRequired,
};

export default MessageList;
