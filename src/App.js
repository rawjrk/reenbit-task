import { Component } from "react";
import ProfileInfo from "./components/ProfileInfo";
import ChatSearch from "./components/ChatSearch";
import ChatList from "./components/ChatList";
import MessageList from "./components/MessageList";
import NewMessage from "./components/NewMessage";
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chatSelected: null
    }
    this.onChatSearch = this.onChatSearch.bind(this)
    this.onChatSelect = this.onChatSelect.bind(this)
    this.onNewMessage = this.onNewMessage.bind(this)
  }

  onChatSearch(e) {
    e.preventDefault()
    alert('Search started')
  }

  onChatSelect(chatSelected) {
    this.setState({ chatSelected })
    alert(`Chat selected: ${chatSelected}`)
  }

  onNewMessage(e) {
    e.preventDefault()
    const newMessage = e.target.querySelector('#message-input')
    alert(`New message sent: ${newMessage.value}`)
    newMessage.value = ''
  }

  render() {
    const { currentUser, chats, messages } = this.props
    return (
      <>
        <main id="main-pannel">
          <header id="user-pannel">
            <ProfileInfo {...currentUser} />
            <ChatSearch onSubmit={this.onChatSearch} />
          </header>
          <h2 id="chats-header">Chats</h2>
          <ChatList chats={chats} onSelect={this.onChatSelect} />
        </main>
        <main id="right-pannel">
          <ProfileInfo {...currentUser} />
          <MessageList messages={messages} currentUserId={currentUser.id} />
          <NewMessage onSend={this.onNewMessage} />
        </main>
      </>
    )
  }
}

export default App