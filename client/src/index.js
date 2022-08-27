import React from 'react';
import { createRoot } from 'react-dom/client';
import { getChats } from './utils/request';
import App from './components/App';
import './index.css';

window.React = React;
const container = document.getElementById('app');
const root = createRoot(container);

getChats().then(data => {
  const { currentUser, chats } = data;
  root.render(<App currentUser={currentUser} chats={chats} />);
});
