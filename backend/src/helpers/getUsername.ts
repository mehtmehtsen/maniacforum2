import { pg } from "../postgresService";

export interface UserRes {
  username: string;
}

// get user name by id
export const getUsernamePromise = async (userId: number): Promise<UserRes> => {
  return pg
    .one("SELECT username FROM users WHERE id=$1;", userId)
    .then((userRes) => {
      return userRes;
    })
    .catch((e) => {
      console.log(e);
    });
};
