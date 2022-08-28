import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { userSchema, messageSchema } from '../../utils/schemas';
import ProfileInfo from '../common/ProfileInfo';
import MessageList from './MessageList';
import NewMessageForm from './NewMessageForm';
import './MessagePanel.css';

const MessagePanel = forwardRef((props, lastMessageRef) => {
  const { currentUser, selectedUser, messages, onNewMessage } = props;

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
        ref={lastMessageRef}
        messages={messages}
        currentUserId={currentUser.id}
        userPicUrl={selectedUser.picture}
      />
      <NewMessageForm userId={selectedUser.id} onSend={onNewMessage} />
    </main>
  );
});

MessagePanel.propTypes = {
  currentUser: userSchema.isRequired,
  selectedUser: userSchema,
  messages: PropTypes.arrayOf(messageSchema).isRequired,
  onNewMessage: PropTypes.func,
};

MessagePanel.defaultProps = {
  selectedUser: null,
  onNewMessage: f => f,
};

export default MessagePanel;
