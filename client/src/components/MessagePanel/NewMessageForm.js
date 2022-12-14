import React from 'react';
import PropTypes from 'prop-types';
import './NewMessageForm.css';

const NewMessageForm = ({ userId, onSend }) => {
  const inputRef = React.createRef();
  return (
    <form id="new-message" onSubmit={e => onSend(e, inputRef.current, userId)}>
      <input ref={inputRef} id="message-input" type="text" placeholder="Type your message" />
      <button type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" className="bi bi-send" viewBox="0 0 24 24">
          <path d="M4.01,6.03 L11.52,9.25 L4,8.25 L4.01,6.03 Z M11.51,14.75 L4,17.97 L4,15.75 L11.51,14.75 Z M2.01,3 L2,10 L17,12 L2,14 L2.01,21 L23,12 L2.01,3 Z" />
        </svg>
      </button>
    </form>
  );
};

NewMessageForm.propTypes = {
  userId: PropTypes.string.isRequired,
  onSend: PropTypes.func,
};

NewMessageForm.defaultProps = {
  onSend: f => f,
};

export default NewMessageForm;
