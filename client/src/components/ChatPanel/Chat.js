import React from 'react';
import { datetimeToChatFormat } from '../../utils/dt';
import UserPicture from '../common/UserPicture';
import './Chat.css';

const Chat = ({ user, message, onClick = f => f }) => (
  <div className="chat" onClick={onClick} role="button">
    <span className="status-overlay" />
    <UserPicture url={user.picture} />
    <div>
      <p className="profile-name">{user.name}</p>
      <p className="message-text">{message.text}</p>
    </div>
    <p className="sent-on">{datetimeToChatFormat(message.sentOn)}</p>
  </div>
);

export default Chat;
