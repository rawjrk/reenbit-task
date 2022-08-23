import { Component } from "react";
import ProfileInfo from "./ProfileInfo";
import ChatSearch from "./ChatSearch";
import ChatList from "./ChatList";
import MessageList from "./MessageList";
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chatSelected: null
    }
    this.onChatSearch = this.onChatSearch.bind(this)
    this.onChatSelect = this.onChatSelect.bind(this)
  }

  onChatSearch(e) {
    e.preventDefault()
    alert('Search started')
  }

  onChatSelect(chatSelected) {
    this.setState({ chatSelected })
    alert(`Chat selected: ${chatSelected}`)
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
          <MessageList messages={messages} />
        </main>
      </>
    )
  }
}

export default App