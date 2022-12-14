const { readData, writeData } = require('../manip');

const currentUser = readData('currentUser');

module.exports.seedUsers = users => {
  writeData('users', [...users, currentUser]);
  console.log('Seeded users successfully!');

  return users;
};

module.exports.seedMessages = users => {
  const messages = [];
  users.forEach(u => {
    // -- 1 -- //
    messages.push({
      fromUser: u.id,
      toUser: currentUser.id,
      text: 'Hello!',
      sentOn: new Date(),
    });
    // -- 2 -- //
    messages.push({
      fromUser: currentUser.id,
      toUser: u.id,
      text: 'Hi! Tell me a joke.',
      sentOn: new Date(),
    });
    // -- 3 -- //
    messages.push({
      fromUser: u.id,
      toUser: currentUser.id,
      text: 'Get back to work!',
      sentOn: new Date(),
    });
  });

  writeData('messages', messages);
  console.log('Seeded messages successfully!');

  return messages;
};
