import React, { Component } from 'react';
import { getChats, getMessages, postMessage } from '../utils/request';
import ChatPanel from './ChatPanel';
import MessagePanel from './MessagePanel';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true, // cache ?
      currentUser: null, // cache to session
      chats: [], // cache to session
      selectedUser: null, // cache to session
      messages: [], // cache to session
    };

    this.onChatSearch = this.onChatSearch.bind(this);
    this.onChatSelect = this.onChatSelect.bind(this);
    this.onNewMessage = this.onNewMessage.bind(this);
  }

  componentDidMount() {
    getChats().then(data => {
      const { currentUser, chats } = data;
      this.setState({ loading: false, currentUser, chats });
    });
  }

  onChatSearch(e) {
    e.preventDefault();
    alert('Search started');
  }

  onChatSelect(userId) {
    getMessages(userId).then(data => {
      const { user, messages } = data;
      this.setState({ selectedUser: user, messages });
    });
  }

  onNewMessage(e, inputElem, toUser) {
    e.preventDefault();
    if (!inputElem.value) return;

    const { currentUser, messages } = this.state;

    const newMessage = {
      fromUser: currentUser.id,
      toUser,
      text: inputElem.value,
      sentOn: new Date(),
    };

    inputElem.value = '';

    postMessage(newMessage).then(body => {
      const { reply } = body;
      this.setState({ messages: [...messages, newMessage, reply] });
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    const { currentUser, selectedUser, chats, messages } = this.state;
    const { onNewMessage, onChatSelect, onChatSearch } = this;

    return (
      <>
        <ChatPanel
          currentUser={currentUser}
          chats={chats}
          onSelect={onChatSelect}
          onSearch={onChatSearch}
        />
        <MessagePanel
          currentUser={currentUser}
          selectedUser={selectedUser}
          messages={messages}
          onNewMessage={onNewMessage}
        />
      </>
    );
  }
}

export default App;
