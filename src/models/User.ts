import { DisplayNameRegex, EmailRegex, PhoneRegex } from "src/utilities/regex";
import { validate as uuidValidate } from "uuid";

export class ProfileLink {
  type: string;
  url: string;

  static validate({ type, url }: ProfileLink): void {
    if (!type) throw "type required on profile link";
    if (!url) throw "url required on profile link";
  }
}

export class User {
  id: string;
  cognitoUsername: string;
  displayName: string;
  email: string;
  phone: string;
  employerMode: boolean;
  bio: string;
  signupDate: Date;
  profileLinks: ProfileLink[] = [];

  static new(data: Omit<User, "signupDate">): User {
    const user: User = {
      id: data.id,
      cognitoUsername: data.cognitoUsername,
      displayName: data.displayName
        .split(" ")
        .filter((x) => !!x)
        .join(" "), // remove whitespace
      email: data.email,
      phone: data.phone.replace(/[() -]/, ""), // strip out common non-numeric characters
      employerMode: data.employerMode,
      bio: data.bio ?? "",
      signupDate: new Date(),
      profileLinks: data.profileLinks ?? [],
    };

    this.validate(user);

    return user;
  }

  static validate(user: User): void {
    if (!uuidValidate(user.id)) throw `${user.id} is not a valid user id -- must be a uuid`;
    if (user.cognitoUsername === undefined) throw "cognitoUsername is required"
    if (!DisplayNameRegex.test(user.displayName)) throw `${user.displayName} is not a valid display name`;
    if (!EmailRegex.test(user.email)) throw `${user.email} is not a valid email`;
    if (!PhoneRegex.test(user.phone)) throw `${user.phone} is not a valid phone`;
    if (typeof user.employerMode !== 'boolean') throw `${user.employerMode} is not a valid employer mode`;

    user.profileLinks.forEach((link) => ProfileLink.validate(link));
  }
}
