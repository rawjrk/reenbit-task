const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const { getChats } = require('./controllers/chats');
const { getSearch } = require('./controllers/search');
const { getMessages, postMessages } = require('./controllers/messages');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client', 'public')));

app.get('/chats', getChats);
app.get('/search', getSearch);

app.get('/messages/:userId', getMessages);
app.post('/messages', postMessages);

app.listen(port, () => {
  console.log(`Running server on port ${port}`);
});
