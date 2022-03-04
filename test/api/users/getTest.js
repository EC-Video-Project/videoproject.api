'use strict'

const assert = require('chai').assert;
const {  } = require('../../../src/api/users/get');

describe('GET /users/{userId} endpoint', function(){
  // should hit the users table
  // when the id does not exist in the table
    // should return false with status 200
  // when the id exists in the table
    // should return the user object with status 200
    // if given second optional arg as true
      // return all user attributes
    // if not given second optional param, or if false
      // only return certain (?) user attributes
})