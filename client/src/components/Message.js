import React from 'react';
import { datetimeToMessageFormat } from '../utils/dt';
import './Message.css';

const Message = ({ text, sentOn, isCurrentUser }) => {
  let msgClass = 'message';
  if (isCurrentUser) msgClass += ' from-current-user';

  return (
    <section className={msgClass}>
      <div className="message-text">{text}</div>
      <div className="sent-on">{datetimeToMessageFormat(sentOn)}</div>
    </section>
  );
};

export default Message;
