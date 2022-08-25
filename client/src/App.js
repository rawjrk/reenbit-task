import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import ProfileInfo from './components/ProfileInfo';
import ChatSearch from './components/ChatSearch';
import ChatList from './components/ChatList';
import MessagePanel from './components/MessagePanel';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: {
        name: null,
        picture: null,
      },
      chats: [],
      conversation: [],
    };
    this.onChatSearch = this.onChatSearch.bind(this);
    this.onChatSelect = this.onChatSelect.bind(this);
    this.onNewMessage = this.onNewMessage.bind(this);
  }

  componentDidMount() {
    fetch('/chats')
      .then(response => response.json())
      .then(data => {
        const { currentUser, chats } = data;
        this.setState({ loading: false, currentUser, chats });
      });
  }

  onChatSearch(e) {
    e.preventDefault();
    alert('Search started');
  }

  onChatSelect(chatSelected) {
    fetch(`/messages/${chatSelected}`)
      .then(response => response.json())
      .then(conversation => {
        this.setState({ conversation });
      });
  }

  onNewMessage(e) {
    e.preventDefault();
    const newMessage = e.target.querySelector('#message-input');
    alert(`New message sent: ${newMessage.value}`);
    newMessage.value = '';
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    const { currentUser, chats, conversation } = this.state;
    const { onNewMessage } = this;

    return (
      <>
        <main id="chat-panel">
          <header id="user-panel">
            <ProfileInfo user={currentUser} />
            <ChatSearch onSubmit={this.onChatSearch} />
          </header>
          <h2 id="chats-header">Chats</h2>
          <ChatList chats={chats} onSelect={this.onChatSelect} />
        </main>
        <MessagePanel
          currentUser={currentUser}
          conversation={conversation}
          onNewMessage={onNewMessage}
        />
      </>
    );
  }
}

export default App;
