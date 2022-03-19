const assert = require('chai').assert;
const {  } = require('../../../src/api/users/get');

describe('GET /user endpoint', function(){
  // if given an id in the query string
    // uses that id
  // if not given an id
    // gets the id from the jwt

  
  // should hit the users table
  // when the id does not exist in the table
    // should return false with status 200
  // when the id exists in the table
    // should return the user object with status 200
    // if given second optional arg as true
      // return all user attributes
    // if not given second optional param, or if false
      // only return certain (?) user attributes
});
