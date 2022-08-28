import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './index.css';

window.React = React;
const container = document.getElementById('app');
const root = createRoot(container);

if (Notification.permission === 'default') {
  Notification.requestPermission();
}

// no login api, so this is a constant value
const currentUser = {
  id: 'literally-me',
  name: '',
  picture: 'assets/images/no-profile-picture.jpg',
};

root.render(<App currentUser={currentUser} />);
