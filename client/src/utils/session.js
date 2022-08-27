module.exports.sessionRetrieve = key => {
  const data = sessionStorage.getItem(key);
  return JSON.parse(data);
};

module.exports.sessionSave = (key, data) => {
  const dataStr = JSON.stringify(data);
  sessionStorage.setItem(key, dataStr);
};
