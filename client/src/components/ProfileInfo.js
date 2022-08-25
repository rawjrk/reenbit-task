import React from 'react';
import './ProfileInfo.css';

const ProfileInfo = ({ name, picture }) => (
  <div className="profile-info">
    <img src={picture} className="profile-picture" alt="profile" />
    <h2 className="profile-name">{name}</h2>
  </div>
);

export default ProfileInfo;
