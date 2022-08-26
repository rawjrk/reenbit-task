const { getFakeUsers, formatFakeUsers } = require('./fakeUsers');
const { writeData } = require('../manip');

// const usersFile = path.join(__dirname, '../users.json');
// const messagesFile = path.join(__dirname, '../messages.json');

const currentUser = {
  'id': 'literally-me',
  'name': null,
  'picture': 'assets/images/no-profile-picture.jpg',
};

getFakeUsers(5)
    .then(res => formatFakeUsers(res))
    .then(users => {
      writeData('users', [...users, currentUser]);

      console.log('Seeded users successfully!');

      const messages = [];
      users.forEach(u => {
        // -- 1 -- //
        messages.push({
          fromUser: u.id,
          toUser: currentUser.id,
          text: 'Hi!',
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
    })
    .catch(err => {
      console.log(err);
    });
