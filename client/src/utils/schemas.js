import PropTypes from 'prop-types';

export const userSchema = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
});

export const messageSchema = PropTypes.shape({
  fromUser: PropTypes.string.isRequired,
  toUser: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  sentOn: PropTypes.string.isRequired,
});

export const chatsArraySchema = PropTypes.arrayOf(PropTypes.shape({
  user: userSchema.isRequired,
  message: messageSchema.isRequired,
}));
