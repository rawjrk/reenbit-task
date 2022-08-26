const fs = require('fs');
const path = require('path');

const pathTo = file => path.join(__dirname, `${file}.json`);

module.exports.readData = file => {
  const data = fs.readFileSync(pathTo(file));
  return JSON.parse(data);
};

module.exports.writeData = (file, data) => {
  const dataStr = JSON.stringify(data, null, 2);
  fs.writeFileSync(pathTo(file), dataStr);
};
