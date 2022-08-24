const fetch = require('isomorphic-fetch')
const { v4 } = require('uuid')

module.exports.getFakeUsers = async (count) => {
  const response = await fetch(`https://randomuser.me/api/?results=${count}&nat=us`)
  const body = await response.json()

  return body.results
}

module.exports.formatFakeUsers = (users) => {
  return users.map(user => ({
    id: v4(),
    name: `${user.name.first} ${user.name.last}`,
    picture: user.picture.thumbnail,
  }))
}