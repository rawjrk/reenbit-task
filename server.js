const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'client', 'public')));

app.get('/messages/:userId', (req, res) => {
  const { userId } = req.params;
  const messages = JSON.parse(fs.readFileSync('data/messages.json'));
  const conversation = messages.filter(msg =>
    msg.fromUser === userId || msg.toUser === userId);
  res.send(conversation);
});

app.get('/chats', (req, res) => {
  const users = JSON.parse(fs.readFileSync('data/users.json'));
  const contacts = users.filter(user => user.id !== 'literally-me');
  const chatList = contacts.map(user => ({
    user,
    recentMessage: {
      text: 'Lorem ipsum',
      date: 'Aug 22, 2022',
    },
  }));
  res.send(chatList);
});

app.listen(port, () => {
  console.log(`Running server on port ${port}`);
});
