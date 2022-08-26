const express = require('express');
const path = require('path');
const fetch = require('isomorphic-fetch');

const { readData, writeData } = require('./data/manip');

const app = express();
const port = 3000;

app.use(express.json());

// no login api, so this is a constant value
const currentUserId = 'literally-me';

app.use(express.static(path.join(__dirname, 'client', 'public')));

app.get('/messages/:userId', (req, res) => {
  const { userId } = req.params;
  const allMessages = readData('messages');
  const allUsers = readData('users');

  const user = allUsers.find(u => u.id === userId);
  const messages = allMessages.filter(msg =>
    msg.fromUser === userId ||
    msg.toUser === userId);

  res.send({ user, messages });
});

app.post('/messages', (req, res) => {
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
});

app.get('/chats', (req, res) => {
  const users = readData('users');
  const currentUser = users.find(user => user.id === currentUserId);
  const contacts = users.filter(user => user.id !== currentUserId);

  const messages = readData('messages');

  const chats = contacts.map(user => {
    const recentMessage = messages.filter(msg =>
      (msg.fromUser === user.id || msg.toUser === user.id))[2];
    return { user, recentMessage };
  });
  res.send({ currentUser, chats });
});

app.listen(port, () => {
  console.log(`Running server on port ${port}`);
});
