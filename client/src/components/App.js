import React, { Component, createRef } from 'react';
import { getSearch, getMessages, postMessage } from '../utils/request';
import { sessionRetrieve, sessionSave } from '../utils/session';
import ChatPanel from './ChatPanel';
import MessagePanel from './MessagePanel';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const { currentUser, chats } = this.props;
    const selectedUser = sessionRetrieve('selectedUser') || null;
    const messages = sessionRetrieve('messages') || [];

    this.state = {
      currentUser,
      chats,
      selectedUser,
      messages,
      searching: false,
      searchMatch: [],
    };

    this.onChatSearch = this.onChatSearch.bind(this);
    this.onChatSelect = this.onChatSelect.bind(this);
    this.onNewMessage = this.onNewMessage.bind(this);

    this.lastMessageRef = createRef();
  }

  componentDidMount() {
    const { messages } = this.state;
    const { current: lastMessage } = this.lastMessageRef;
    if (messages.length > 0) {
      lastMessage.scrollIntoView();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { messages } = this.state;
    const { current: lastMessage } = this.lastMessageRef;
    if (messages !== prevState.messages) {
      lastMessage.scrollIntoView();
      sessionSave('messages', messages);
    }
  }

  onChatSearch(e, inputElem) {
    e.preventDefault();
    if (!inputElem.value) {
      this.setState({ searching: false, searchMatch: [] });
      return;
    }

    const queryStr = inputElem.value;
    getSearch(queryStr)
      .then(data => {
        const { searchMatch } = data;
        this.setState({ searching: true, searchMatch });
      });
  }

  onChatSelect(userId) {
    getMessages(userId).then(data => {
      const { user, messages } = data;
      this.setState({ selectedUser: user, messages });
      sessionSave('selectedUser', user);
    });
    this.lastMessageRef = createRef();
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
    this.setState({ messages: [...messages, newMessage] });

    postMessage(newMessage).then(body => {
      const { reply } = body;
      const { messages } = this.state;
      this.setState({ messages: [...messages, reply] });
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    const { currentUser, selectedUser, chats, messages, searching, searchMatch } = this.state;
    const { onNewMessage, onChatSelect, onChatSearch, lastMessageRef } = this;

    return (
      <>
        <ChatPanel
          currentUser={currentUser}
          chats={searching ? searchMatch : chats}
          onSelect={onChatSelect}
          onSearch={onChatSearch}
        />
        <MessagePanel
          currentUser={currentUser}
          selectedUser={selectedUser}
          messages={messages}
          onNewMessage={onNewMessage}
          lastMessageRef={lastMessageRef}
        />
      </>
    );
  }
}

export default App;
