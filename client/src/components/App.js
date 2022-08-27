import React, { Component, createRef } from 'react';
import { getSearch, getMessages, postMessage } from '../utils/request';
import ChatPanel from './ChatPanel';
import MessagePanel from './MessagePanel';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // static parameters, so initialized from props
    const { currentUser, chats } = this.props;

    this.state = {
      searching: false,
      currentUser,
      chats,
      selectedUser: null,
      messages: [],
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
    if(messages !== prevState.messages) {
      lastMessage.scrollIntoView();
    }
  }

  onChatSearch(e, inputElem) {
    e.preventDefault();
    if (!inputElem.value) {
      // this.setState({ searching: false })
      return;
    }

    const queryStr = inputElem.value;
    getSearch(queryStr)
      .then(data => {
        console.log('Search:', data);
      })
  }

  onChatSelect(userId) {
    getMessages(userId).then(data => {
      const { user, messages } = data;
      this.setState({ selectedUser: user, messages });
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
      this.setState({ messages: [...messages, newMessage, reply] });
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    const { currentUser, selectedUser, chats, messages } = this.state;
    const { onNewMessage, onChatSelect, onChatSearch, lastMessageRef } = this;

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
          lastMessageRef={lastMessageRef}
        />
      </>
    );
  }
}

export default App;
