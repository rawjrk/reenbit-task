import React from 'react';
import PropTypes from 'prop-types';
import { chatsArraySchema } from '../../utils/schemas';
import Chat from './Chat';
import './ChatList.css';

const ChatList = ({ chats, onSelect }) => (
  <section id="chat-list">
    {chats.map((chat, i) => (
      <Chat
        key={i}
        user={chat.user}
        message={chat.message}
        onSelect={() => onSelect(chat.user.id)}
      />
    ))}
  </section>
);

ChatList.propTypes = {
  chats: chatsArraySchema.isRequired,
  onSelect: PropTypes.func,
};

ChatList.defaultProps = {
  onSelect: f => f,
};

export default ChatList;
