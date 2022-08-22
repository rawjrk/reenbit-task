const path = require('path')
const fs = require('fs')
const { getFakeUsers, formatFakeUsers } = require('./helpers')

const usersFile = path.join(__dirname, '../users.json')

getFakeUsers(5)
  .then(users => formatFakeUsers(users))
  .then(res => {
    const data = JSON.stringify(res, null, 2)
    fs.writeFileSync(usersFile, data)
    console.log('Seeded successfully!')
  })
  .catch(err => {
    console.log(err)
  })