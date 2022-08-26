import React from 'react';
import './UserPicture.css';

const UserPicture = ({ url }) => (
  <img src={url} className="user-picture" alt="user" />
);

export default UserPicture;
