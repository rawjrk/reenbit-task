const { readData } = require('../data/manip');

// no login api, so this is a constant value
const currentUserId = 'literally-me';

module.exports.getChats = (req, res) => {
  const users = readData('users');
  const currentUser = users.find(user => user.id === currentUserId);
  const contacts = users.filter(user => user.id !== currentUserId);

  const messages = readData('messages');

  const chats = contacts.map(user => {
    const userMessages = messages.filter(msg =>
      (msg.fromUser === user.id || msg.toUser === user.id));
    const recentMessage = userMessages[userMessages.length - 1];

    return { user, message: recentMessage };
  });
  res.send({ currentUser, chats });
};
