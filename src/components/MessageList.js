import Message from "./Message"
import "./MessageList.css"

const MessageList = ({ messages }) =>
  <section id="message-list">
    {messages.map((msg, i) => <Message key={i} {...msg} />)}
  </section>

export default MessageList