import "./Chat.css"

const Chat = ({ user, message, onClick=f=>f }) =>
  <div className="chat" onClick={onClick}>
    <img src={user.picture} className="profile-picture" />
    <div>
      <p className="profile-name">{user.name}</p>
      <p className="message-text">{message.text}</p>
    </div>
    <p className="message-date">{message.date}</p>
  </div>

export default Chat