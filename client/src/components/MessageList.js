import Message from "./Message"
import "./MessageList.css"

const MessageList = ({ messages, currentUserId }) =>
  <div id="message-list">
    {messages.map((msg, i) =>
        <Message key={i}
            {...msg}
            isCurrentUser={msg.userId === currentUserId} />)}
  </div>

export default MessageList