import fetch from 'isomorphic-fetch';

const request = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

export const getChats = async () => {
  const data = await request('/chats');
  return data;
};

export const getSearch = async queryStr => {
  const data = await request(`/search?q=${queryStr}`);
  return data;
};

export const getMessages = async userId => {
  const data = await request(`/messages/${userId}`);
  return data;
};

export const postMessage = async newMessage => {
  const options = {
    method: 'POST',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify({ newMessage }),
  };

  const data = request('/messages', options);
  return data;
};
