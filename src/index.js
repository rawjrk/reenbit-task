import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import "./index.css"

import users from '../data/users.json'
const chatList = users.map(user => ({
  user,
  message: {
    text: 'Lorem ipsum',
    date: 'Aug 22, 2022',
  }
}))
const currentUser = {
  id: 'you',
  name: null,
  picture: 'assets/images/no-profile-picture.jpg',
}
import messages from '../data/messages.json'

window.React = React
const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App currentUser={currentUser} chats={chatList} messages={messages} />)