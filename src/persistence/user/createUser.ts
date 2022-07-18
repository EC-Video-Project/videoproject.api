import { User } from "src/models/User";

export const createUser = async (user: User, authId: string) => {
  const sql = `
  insert into User
  (authId,  displayName,  email,  phone,  employerMode,  bio,  profileLinks)
  values
  (:authId, :displayName, :email, :phone, :employerMode, :bio, :profileLinks);
  `;

  const onComplete = function (err, results, fields) {
    console.log(results);
  };
};
