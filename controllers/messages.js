const fetch = require('isomorphic-fetch');
const { readData, writeData } = require('../data/manip');

module.exports.getMessages = (req, res) => {
  const { userId } = req.params;
  const allMessages = readData('messages');
  const allUsers = readData('users');

  const user = allUsers.find(u => u.id === userId);
  const messages = allMessages.filter(msg =>
    msg.fromUser === userId ||
    msg.toUser === userId);

  res.send({ user, messages });
};

module.exports.postMessages = (req, res) => {
  const { newMessage } = req.body;
  const messages = readData('messages');
  writeData('messages', [...messages, newMessage]);

  fetch('https://api.chucknorris.io/jokes/random')
      .then(response => response.json())
      .then(joke => {
        const replyMessage = {
          fromUser: newMessage.toUser,
          toUser: newMessage.fromUser,
          text: joke.value,
          sentOn: new Date(),
        };
        writeData('messages', [...messages, newMessage, replyMessage]);
        res.send({ reply: replyMessage });
      });
};
