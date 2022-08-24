import "./Message.css"

const Message = ({ text, date, isCurrentUser }) =>
  <section className={"message" + (isCurrentUser ? " you" : "")}>
    <div className="message-text">{text}</div>
    <div className="message-date">{date}</div>
  </section>

export default Message