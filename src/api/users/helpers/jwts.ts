import jwt_decode, { JwtPayload } from 'jwt-decode';

type userInfoPayload = JwtPayload & { 
  email:string,
  name: string,
  given_name: string,
  family_name: string
  picture: string
};

type userInfoObject = {
  sub: string,
  email: string,
  name: string,
  firstName: string,
  lastName: string,
  profilePic: string,
}

export const userInfo = (token = ''): userInfoObject => {
  const decoded = jwt_decode<userInfoPayload>(token);
  const userInfo = { 
    sub: decoded.sub,
    email: decoded.email,
    name: decoded.name,
    firstName: decoded.given_name, 
    lastName: decoded.family_name, 
    profilePic: decoded.picture 
  };
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