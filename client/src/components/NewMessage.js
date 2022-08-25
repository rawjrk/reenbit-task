import React from 'react';
import './NewMessage.css';

const NewMessage = ({ onSend = f => f }) => (
  <form id="new-message" onSubmit={onSend}>
    <input id="message-input" type="text" placeholder="Type your message" />
    <button type="submit">
      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" className="bi bi-send" viewBox="0 0 24 24">
        <path d="M4.01,6.03 L11.52,9.25 L4,8.25 L4.01,6.03 Z M11.51,14.75 L4,17.97 L4,15.75 L11.51,14.75 Z M2.01,3 L2,10 L17,12 L2,14 L2.01,21 L23,12 L2.01,3 Z" />
      </svg>
    </button>
  </form>
);

export default NewMessage;
