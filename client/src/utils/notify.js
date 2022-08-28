const notify = (header, body, icon) => {
  const popup = new Notification(header, { body, icon });
  setTimeout(() => popup.close(), 10 * 1000);
  return popup;
};

export default notify;

export const notifyMessage = (message, user) => {
  const { name, picture } = user;
  const { text } = message;
  const popup = notify(name, text, picture);
  return popup;
};
