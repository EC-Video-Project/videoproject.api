"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInfo = void 0;
var jwt_decode = require('jwt-decode');
var userInfo = function (token) {
    if (token === void 0) { token = ''; }
    var decoded = jwt_decode(token);
    var sub = decoded.sub, email = decoded.email, name = decoded.name, given_name = decoded.given_name, family_name = decoded.family_name, picture = decoded.picture;
    var userInfo = { sub: sub, email: email, name: name, firstName: given_name, lastName: family_name, profilePic: picture };
    return userInfo;
};
exports.userInfo = userInfo;
// example token (Google login)
// {
//   "at_hash": "MwbBDivEenXxUhpZN0335w",
//   "sub": "bd22e766-b431-4464-a889-0bdab6f01439",
//   "cognito:groups": [
//     "us-west-2_4BQDdJ7hN_Google"
//   ],
//   "email_verified": false,
//   "iss": "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_4BQDdJ7hN",
//   "cognito:username": "google_109844304513055947397",
//   "given_name": "Charis",
//   "picture": "https://lh3.googleusercontent.com/a/AATXAJzMNtWTVMOnB2-pbOI330YiMdmPhDgKOwpQpDWW=s96-c",
//   "aud": "c5vdjbs23cn99ba0g6eeepovg",
//   "identities": [
//     {
//       "userId": "109844304513055947397",
//       "providerName": "Google",
//       "providerType": "Google",
//       "issuer": null,
//       "primary": "true",
//       "dateCreated": "1644388231466"
//     }
//   ],
//   "token_use": "id",
//   "auth_time": 1647206435,
//   "name": "Charis Ginn",
//   "exp": 1647292835,
//   "iat": 1647206435,
//   "family_name": "Ginn",
//   "jti": "a0dec0ea-b272-4de7-9c47-854416c71f27",
//   "email": "alignbank@gmail.com"
// }
//# sourceMappingURL=jwts.js.map