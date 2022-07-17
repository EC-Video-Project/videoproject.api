import { DisplayNameRegex, EmailRegex, PhoneRegex } from "src/utilities/regex";

export class ProfileLink {
  type: string;
  url: string;

  static validate({ type, url }: ProfileLink): void {
    if (!type) throw "type required on profile link";
    if (!url) throw "url required on profile link";
  }
}

export class User {
  id: number;
  displayName: string;
  email: string;
  phone: string;
  employerMode: boolean;
  bio: string;
  signupDate: Date;
  profileLinks: ProfileLink[] = [];

  static new(data: {
    displayName: string;
    email: string;
    phone: string;
    employerMode: boolean;
    bio?: string;
    profileLinks?: ProfileLink[];
  }): User {
    const user: User = {
      id: -1,
      displayName: data.displayName
        .split(" ")
        .filter((x) => !!x)
        .join(" "), // remove whitespace
      email: data.email,
      phone: data.phone.replace(/[\(\) -]/, ""), // strip out common non-numeric characters
      employerMode: data.employerMode,
      bio: data.bio ?? "",
      signupDate: new Date(),
      profileLinks: data.profileLinks ?? [],
    };

    this.validate(user);

    return user;
  }

  static validate(user: User): void {
    if (user.id === undefined) throw "missing id";
    if (!DisplayNameRegex.test(user.displayName)) throw "invalid display name";
    if (!EmailRegex.test(user.email)) throw "invalid email";
    if (!PhoneRegex.test(user.phone)) throw "invalid phone";
    if (user.employerMode === undefined) throw "employer mode is required";

    user.profileLinks.forEach((link) => ProfileLink.validate(link));
  }
}
