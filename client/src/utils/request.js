import fetch from 'isomorphic-fetch';

export const getChats = async () => {
  const response = await fetch('/chats');

  const data = await response.json();
  return data;
};

export const getMessages = async userId => {
  const response = await fetch(`/messages/${userId}`);

  const data = await response.json();
  return data;
};

export const postMessage = async newMessage => {
  const response = await fetch('/messages', {
    method: 'POST',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify({ newMessage }),
  });

  const data = await response.json();
  return data;
};
