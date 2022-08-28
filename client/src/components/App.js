import React, { Component, createRef } from 'react';
import { getChats, getSearch, getMessages, postMessage } from '../utils/request';
import { sessionRetrieve, sessionSave } from '../utils/session';
import { notifyMessage } from '../utils/notify';
import ChatPanel from './ChatPanel';
import MessagePanel from './MessagePanel';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const { currentUser } = this.props;
    const selectedUser = sessionRetrieve('selectedUser') || null;
    const messages = sessionRetrieve('messages') || [];
    const chats = sessionRetrieve('chats') || [];

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
    this.onIncomingMessage = this.onIncomingMessage.bind(this);

    this.lastMessageRef = createRef();
  }

  componentDidMount() {
    const { selectedUser, messages, chats } = this.state;
    const { current: lastMessage } = this.lastMessageRef;
    if (selectedUser && messages.length > 0) {
      lastMessage.scrollIntoView();
    }
    if (!chats.length) {
      getChats().then(data => {
        const { chats } = data;
        this.setState({ chats });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { messages, chats } = this.state;
    const { current: lastMessage } = this.lastMessageRef;
    if (messages !== prevState.messages) {
      lastMessage.scrollIntoView();
      sessionSave('messages', messages);
    }
    if (chats !== prevState.chats) {
      sessionSave('chats', chats);
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

  onIncomingMessage(replyMessage, replyUser) {
    const { messages, chats, selectedUser } = this.state;

    const updatedChats = [
      { user: replyUser, message: replyMessage },
      ...chats.filter(chat => chat.user.id !== replyUser.id),
    ];
    this.setState({ chats: updatedChats });

    if (selectedUser.id === replyUser.id) {
      this.setState({ messages: [...messages, replyMessage] });
    }

    const popup = notifyMessage(replyMessage, replyUser);
    popup.onclick = () => {
      this.onChatSelect(replyUser.id)
    };
  }

  onNewMessage(e, inputElem, toUser) {
    e.preventDefault();
    if (!inputElem.value) return;

    const { currentUser, messages, chats, selectedUser } = this.state;

    const newMessage = {
      fromUser: currentUser.id,
      toUser,
      text: inputElem.value,
      sentOn: new Date(),
    };
    inputElem.value = '';

    const updatedChats = [
      { user: selectedUser, message: newMessage },
      ...chats.filter(chat => chat.user.id !== selectedUser.id),
    ];

    this.setState({
      chats: updatedChats,
      messages: [...messages, newMessage],
    });

    postMessage(newMessage).then(body => {
      const { message: replyMessage, user: replyUser } = body;
      this.onIncomingMessage(replyMessage, replyUser);
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
