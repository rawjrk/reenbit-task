import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { datetimeToMessageFormat } from '../../utils/dt';
import UserPicture from '../common/UserPicture';
import './Message.css';

const Message = forwardRef((props, ref) => {
  const { text, sentOn, isIncoming, userPicUrl } = props;

  const ioClass = isIncoming ? 'incoming' : 'outcoming';
  const image = <UserPicture url={userPicUrl} />;

  return (
    <section className={`message ${ioClass}`} ref={ref}>
      {isIncoming ? image : null}
      <div className="message-text">{text}</div>
      <span className="sent-on">{datetimeToMessageFormat(sentOn)}</span>
    </section>
  );
});

Message.propTypes = {
  text: PropTypes.string.isRequired,
  sentOn: PropTypes.string.isRequired,
  isIncoming: PropTypes.bool.isRequired,
  userPicUrl: PropTypes.string.isRequired,
};

export default Message;
