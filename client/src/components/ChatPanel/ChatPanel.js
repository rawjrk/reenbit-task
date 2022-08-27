import React from 'react';
import ProfileInfo from '../common/ProfileInfo';
import ChatSearch from './ChatSearchForm';
import ChatList from './ChatList';
import './ChatPanel.css';

const ChatPanel = ({
  currentUser, chats, onSelect = f => f, onSearch = f => f,
}) => (
  <main id="chat-panel">
    <header id="user-panel">
      <ProfileInfo user={currentUser} />
      <ChatSearch onSearch={onSearch} />
    </header>
    <h2 id="chat-list-header">Chats</h2>
    <ChatList chats={chats} onSelect={onSelect} />
  </main>
);

export default ChatPanel;
