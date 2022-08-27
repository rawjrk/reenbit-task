const { readData } = require('../data/manip');

// no login api, so this is a constant value
const currentUserId = 'literally-me';

module.exports.getSearch = (req, res) => {
  const { q: searchText } = req.query;

  const users = readData('users');
  const matchedUsers = users.filter(user => user.name.includes(searchText));

  const messages = readData('messages');
  const searchMatch = messages
      .filter(msg =>
        msg.text.includes(searchText) ||
        matchedUsers.map(user => user.id).includes(msg.fromUser),
      )
      .map(msg => {
        const userId = (msg.fromUser === currentUserId) ?
            msg.toUser :
            msg.fromUser;

        const user = users.find(u => u.id === userId);
        return { user, message: msg };
      });

  res.send({ q: searchText, searchMatch: searchMatch });
};
