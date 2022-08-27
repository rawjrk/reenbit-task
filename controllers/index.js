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

    return { user, recentMessage };
  });
  res.send({ currentUser, chats });
};

module.exports.getSearch = (req, res) => {
  const { q: searchText } = req.query;

  const users = readData('users');
  const matchedUsers = users.filter(user => user.name.includes(searchText));

  const messages = readData('messages');
  const searchMatch = messages.filter(msg =>
    msg.text.includes(searchText) ||
    matchedUsers.map(user => user.id).includes(msg.fromUser)
  );

  res.send({ q: searchText, searchMatch: searchMatch });
};
