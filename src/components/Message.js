import "./Message.css"

const Message = ({ text, date }) =>
  <section className="message">
    <div className="message-text">{text}</div>
    <div className="message-date">{date}</div>
  </section>

export default Message