import React from 'react';
import './ProfileInfo.css';

const ProfileInfo = ({ user }) => (
  <div className="profile-info">
    <img src={user.picture || ''} className="profile-picture" alt="profile" />
    <h2 className="profile-name">{user.name}</h2>
  </div>
);

export default ProfileInfo;
