import jwt_decode from 'jwt-decode';

export const userInfo = (token = '') => {
  const decoded = jwt_decode(token);
  const { sub, email, name, given_name, family_name, picture } = decoded;
  const userInfo = { sub, email, name, firstName: given_name, lastName: family_name, profilePic: picture };
  return userInfo;
};



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