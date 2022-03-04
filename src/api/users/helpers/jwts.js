'use strict';
const jwt_decode = require('jwt-decode');

userInfo = function(token) {
  const decoded = jwt_decode(token);
  const userInfo = (({ sub, username }) => ({ sub, username }))(decoded);
  return userInfo;
};

module.exports = { userInfo };
