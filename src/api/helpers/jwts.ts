import jwt_decode, { JwtPayload } from "jwt-decode";

type userInfoPayload = JwtPayload & {
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};

type userInfoObject = {
  userId: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  profilePic: string;
};

export const userInfo = (token: string): userInfoObject => {
  const decoded = jwt_decode<userInfoPayload>(token);
  const userInfo = {
    userId: decoded.sub,
    email: decoded.email,
    name: decoded.name,
    firstName: decoded.given_name,
    lastName: decoded.family_name,
    profilePic: decoded.picture,
  };
  return userInfo;
};
