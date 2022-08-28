import React from 'react';
import UserPicture from './UserPicture';
import './ProfileInfo.css';

const ProfileInfo = ({ user }) => (
  <div className="profile-info">
    <UserPicture url={user.picture} />
    <span className="status-overlay" />
    <h2 className="profile-name">{user.name}</h2>
  </div>
);

export default ProfileInfo;
