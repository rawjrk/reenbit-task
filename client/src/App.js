import { Component } from "react";
import fetch from "isomorphic-fetch";
import ProfileInfo from "./components/ProfileInfo";
import ChatSearch from "./components/ChatSearch";
import ChatList from "./components/ChatList";
import MessageList from "./components/MessageList";
import NewMessage from "./components/NewMessage";
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      chatSelected: null,
    };
    this.onChatSearch = this.onChatSearch.bind(this);
    this.onChatSelect = this.onChatSelect.bind(this);
    this.onNewMessage = this.onNewMessage.bind(this);

    this.currentUser = {
      id: 'you',
      name: null,
      picture: 'assets/images/no-profile-picture.jpg',
    }

    this.messages = [
      {
        "userId": "384af8d7-af80-4de5-962b-d799a1a14ae3",
        "text": "Quickly come to the meeting room 1B, we have a big server issue",
        "date": "4/22/17, 4:00AM"
      },
      {
        "userId": "you",
        "text": "I'm having breakfast right now, can't you wait for 10 minutes?",
        "date": "4/22/17, 4:05 AM"
      },
      {
        "userId": "384af8d7-af80-4de5-962b-d799a1a14ae3",
        "text": "We are loosing money! Quick!",
        "date": "4/22/17, 4:10 AM"
      }
    ]
  }

  componentDidMount() {
    fetch('/chats')
      .then(response => response.json())
      .then(chatList => {
        this.chatList = chatList;
        this.setState({ loading: false })
      })
  }

  onChatSearch(e) {
    e.preventDefault()
    alert('Search started')
  }

  onChatSelect(chatSelected) {
    this.setState({ chatSelected });
    alert(`Chat selected: ${chatSelected}`);
  }

  onNewMessage(e) {
    e.preventDefault();
    const newMessage = e.target.querySelector('#message-input');
    alert(`New message sent: ${newMessage.value}`);
    newMessage.value = '';
  }

  render() {
    const { loading } = this.state;
    if (loading) return (<p>Loading...</p>);

    const { currentUser, chatList, messages } = this;
    return (
      <>
        <main id="main-pannel">
          <header id="user-pannel">
            <ProfileInfo {...currentUser} />
            <ChatSearch onSubmit={this.onChatSearch} />
          </header>
          <h2 id="chats-header">Chats</h2>
          <ChatList chats={chatList} onSelect={this.onChatSelect} />
        </main>
        <main id="right-pannel">
          <ProfileInfo {...currentUser} />
          <MessageList messages={messages} currentUserId={currentUser.id} />
          <NewMessage onSend={this.onNewMessage} />
        </main>
      </>
    );
  }
}

export default App