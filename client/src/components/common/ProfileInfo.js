import React from 'react';
import PropTypes from 'prop-types';
import UserPicture from './UserPicture';
import './ProfileInfo.css';

const ProfileInfo = ({ user }) => (
  <div className="profile-info">
    <UserPicture url={user.picture} />
    <span className="status-overlay" />
    <h2 className="profile-name">{user.name}</h2>
  </div>
);

ProfileInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileInfo;
