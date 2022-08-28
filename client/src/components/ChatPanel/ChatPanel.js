import React from 'react';
import PropTypes from 'prop-types';
import { userSchema, chatsArraySchema } from '../../utils/schemas';
import ProfileInfo from '../common/ProfileInfo';
import ChatSearch from './ChatSearchForm';
import ChatList from './ChatList';
import './ChatPanel.css';

const ChatPanel = ({ currentUser, chats, onSelect, onSearch }) => (
  <main id="chat-panel">
    <header id="user-panel">
      <ProfileInfo user={currentUser} />
      <ChatSearch onSearch={onSearch} />
    </header>
    <h2 id="chat-list-header">Chats</h2>
    <ChatList chats={chats} onSelect={onSelect} />
  </main>
);

ChatPanel.propTypes = {
  currentUser: userSchema.isRequired,
  chats: chatsArraySchema.isRequired,
  onSelect: PropTypes.func,
  onSearch: PropTypes.func,
};

ChatPanel.defaultProps = {
  onSelect: f => f,
  onSearch: f => f,
};

export default ChatPanel;
