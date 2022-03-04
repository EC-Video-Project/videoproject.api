'use strict'

const assert = require('chai').assert;
const {  } = require('../../../src/api/users/create');

describe('POST /users endpoint', function(){
  // if a user with the id already exists
    // return error message with status 409
  // if no user with the id already exists
    // if not given all proper params (userId, email OR phone, employerMode, username, and firstname lastname)
      // return error message with status 422
    // if given proper params
      // should create the item in the table
      // should return the item with status 200
})