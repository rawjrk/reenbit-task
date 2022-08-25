import React from 'react';
import ProfileInfo from './ProfileInfo';
import MessageList from './MessageList';
import NewMessageForm from './NewMessageForm';
import './MessagePanel.css';

const MessagePanel = ({ currentUser, conversation, onNewMessage = f => f }) => {
  if (conversation.length < 1) {
    return (
      <div id="message-panel">
        <p className="empty">Select a chat to start messaging...</p>
      </div>
    );
  }

  const { user, messages } = conversation;
  return (
    <main id="message-panel">
      <ProfileInfo user={user} />
      <MessageList messages={messages} currentUserId={currentUser.id} />
      <NewMessageForm onSend={onNewMessage} />
    </main>
  );
};

export default MessagePanel;
