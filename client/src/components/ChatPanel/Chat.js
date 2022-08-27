import React from 'react';
import { datetimeToChatFormat } from '../../utils/dt';
import './Chat.css';

const Chat = ({ user, message, onClick = f => f }) => (
  <div className="chat" onClick={onClick} role="button">
    <img src={user.picture} className="profile-picture" alt="profile" />
    <div>
      <p className="profile-name">{user.name}</p>
      <p className="message-text">{message.text}</p>
    </div>
    <p className="sent-on">{datetimeToChatFormat(message.sentOn)}</p>
  </div>
);

export default Chat;
