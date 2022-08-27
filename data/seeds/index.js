const { getFakeUsers, formatFakeUsers } = require('./fakeUsers');
const { seedUsers, seedMessages } = require('./seed');

getFakeUsers(5)
    .then(res => formatFakeUsers(res))
    .then(users => seedUsers(users))
    .then(users => seedMessages(users))
    .catch(err => {
      console.log(err);
    });
