import React from 'react';
import ProfileInfo from '../common/ProfileInfo';
import MessageList from './MessageList';
import NewMessageForm from './NewMessageForm';
import './MessagePanel.css';

const MessagePanel = ({
  currentUser, selectedUser, messages, onNewMessage = f => f, lastMessageRef,
}) => {
  if (!selectedUser) {
    return (
      <main id="message-panel">
        <p className="empty">Select a chat to start messaging...</p>
      </main>
    );
  }

  return (
    <main id="message-panel">
      <ProfileInfo user={selectedUser} />
      <MessageList
        messages={messages}
        currentUserId={currentUser.id}
        userPicUrl={selectedUser.picture}
        lastMessageRef={lastMessageRef}
      />
      <NewMessageForm userId={selectedUser.id} onSend={onNewMessage} />
    </main>
  );
};

export default MessagePanel;
