import React from 'react'
import { createRoot } from 'react-dom/client'
import ContactList from './components/ContactList'
import users from '../data/users.json'

const chats = users.map(u => ({
  ...u, message: {
    text: 'Lorem ipsum',
    date: 'Aug 22, 2022',
  }
}))

window.React = React
const container = document.getElementById('app')
const root = createRoot(container)
root.render(<ContactList users={chats} />)