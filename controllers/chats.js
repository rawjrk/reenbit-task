const { readData } = require('../data/manip');

// no login api, so this is a constant value
const currentUser = readData('currentUser');
const { id: currentUserId } = currentUser;

module.exports.getChats = (req, res) => {
  const users = readData('users');
  const currentUser = users.find(user => user.id === currentUserId);
  const contacts = users.filter(user => user.id !== currentUserId);

  const messages = readData('messages');

  const chats = contacts
      .map(user => {
        const userMessages = messages.filter(msg =>
          msg.fromUser === user.id || msg.toUser === user.id);
        const recentMessage = userMessages[userMessages.length - 1];

        return { user, message: recentMessage };
      })
      .sort((chatA, chatB) => {
        return (chatA.message.sentOn > chatB.message.sentOn) ? -1 : 1;
      });
  res.send({ chats });
};
