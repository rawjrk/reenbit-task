import Contact from "./Contact";

const ContactList = ({ users }) =>
  <div id="chats">
    <h2>Chats</h2>
    {users.map((user, i) =>
      <Contact key={i} {...user} />
      )}
  </div>

export default ContactList