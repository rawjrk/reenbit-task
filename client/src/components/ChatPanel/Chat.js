import React from 'react';
import PropTypes from 'prop-types';
import { userSchema, messageSchema } from '../../utils/schemas';
import { datetimeToChatFormat } from '../../utils/dt';
import UserPicture from '../common/UserPicture';
import './Chat.css';

const Chat = ({ user, message, onSelect }) => {
  const onKeyDown = e => (e.code === 'Enter' ? onSelect() : null);
  return (
    <div className="chat" onClick={onSelect} onKeyDown={onKeyDown} role="button" tabIndex={0}>
      <span className="status-overlay" />
      <UserPicture url={user.picture} />
      <div>
        <p className="profile-name">{user.name}</p>
        <p className="message-text">{message.text}</p>
      </div>
      <p className="sent-on">{datetimeToChatFormat(message.sentOn)}</p>
    </div>
  );
};

Chat.propTypes = {
  user: userSchema.isRequired,
  message: messageSchema.isRequired,
  onSelect: PropTypes.func,
};

Chat.defaultProps = {
  onSelect: f => f,
};

export default Chat;
