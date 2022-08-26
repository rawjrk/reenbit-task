import React from 'react';
import UserPicture from './UserPicture';
import './ProfileInfo.css';

const ProfileInfo = ({ user }) => (
  <div className="profile-info">
    <UserPicture url={user.picture} />
    <h2 className="profile-name">{user.name}</h2>
  </div>
);

export default ProfileInfo;
