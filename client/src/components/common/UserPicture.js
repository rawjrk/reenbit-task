import React from 'react';
import PropTypes from 'prop-types';
import './UserPicture.css';

const UserPicture = ({ url }) => (
  <img src={url} className="user-picture" alt="user" />
);

UserPicture.propTypes = {
  url: PropTypes.string,
};

UserPicture.defaultProps = {
  url: 'assets/images/no-profile-picture.jpg',
};

export default UserPicture;
