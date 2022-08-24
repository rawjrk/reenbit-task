import Chat from "./Chat";
import './ChatList.css'

const ChatList = ({ chats, onSelect=f=>f }) =>
  <section id="chat-list">
    {chats.map((chat, i) =>
      <Chat key={i}
          user={chat.user}
          message={chat.message}
          onClick={() => onSelect(chat.user.id)} />
      )}
  </section>

export default ChatList