import { pg } from "../postgresService";

interface UserRes {
  username: string;
}

// get creator user name
export const getUsernamePromise = async (userId: number): Promise<UserRes> => {
  return pg
    .oneOrNone("SELECT username FROM users WHERE id=$1;", userId)
    .then((userRes) => {
      return userRes;
    })
    .catch((e) => {
      console.log(e);
    });
};
