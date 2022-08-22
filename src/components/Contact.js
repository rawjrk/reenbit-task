const Contact = ({ name, picture, message }) =>
  <div className="contact">
    <img src={picture} className="profile-picture" alt="Profile picture (thumbnail)"/>
    <div>
      <p className="profile-name">{name}</p>
      <p className="message-text">{message.text}</p>
    </div>
    <p className="message-date">{message.date}</p>
  </div>

export default Contact