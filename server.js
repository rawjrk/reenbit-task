const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// no login api, so this is a constant value
const currentUserId = 'literally-me';

app.use(express.static(path.join(__dirname, 'client', 'public')));

app.get('/messages/:userId', (req, res) => {
  const { userId } = req.params;
  const allMessages = JSON.parse(fs.readFileSync('data/messages.json'));
  const allUsers = JSON.parse(fs.readFileSync('data/users.json'));

  const user = allUsers.find(u => u.id === userId);
  const messages = allMessages.filter(msg =>
    msg.fromUser === userId ||
    msg.toUser === userId);

  res.send({ user, messages });
});

app.get('/chats', (req, res) => {
  const users = JSON.parse(fs.readFileSync('data/users.json'));
  const currentUser = users.find(user => user.id === currentUserId);
  const contacts = users.filter(user => user.id !== currentUserId);

  const chats = contacts.map(user => ({
    user,
    recentMessage: {
      text: 'Lorem ipsum',
      sentOn: 'Aug 22, 2022',
    },
  }));
  res.send({ currentUser, chats });
});

app.listen(port, () => {
  console.log(`Running server on port ${port}`);
});
