import { Msg } from "./msg";
import { pg } from "../postgresService";
import { getUsernamePromise } from "../helpers/getUsernamePromise";

// A post request should not contain an id.
// export type MsgCreationParams = Pick<
//   Msg,
//   | "threadId"
//   | "userId"
//   | "parentId"
//   | "parent_userId"
//   | "timestamp"
//   | "title"
//   | "body"
// >;

interface MsgRes {
  board_id: number;
  id: number;
  user_id: number;
  parent_id: number;
  parent_user_id: number;
  timestamp: string;
  subject: string;
  body: string;
  author_mod: boolean;
  path: string;
}

export class MsgsService {
  public async getMsgs(threadId: number): Promise<Msg[]> {
    let out: Msg[] = [];
    await pg
      .many(`SELECT * FROM msgs WHERE $1::text::ltree @> path`, threadId)
      .then(async (msgsRes: MsgRes[]) => {
        const msgPromises = msgsRes.map(async (msgRes) => {
          return this.getMsgDataPromise(msgRes);
        });

        await Promise.all(msgPromises).then((res) => {
          res.forEach((msgData) => {
            console.log("pushing");
            out.push(msgData);
          });
        });
      })
      .catch((error) => console.error(error));

    console.log("out", out);

    return out;
  }

  getMsgDataPromise = async (msgRes: MsgRes): Promise<Msg> => {
    const msgData: Msg = {
      boardId: msgRes.board_id,
      id: msgRes.id,
      userId: msgRes.user_id,
      parentId: msgRes.parent_id,
      parentUserId: msgRes.parent_user_id,
      timestamp: msgRes.timestamp,
      subject: msgRes.subject,
      body: msgRes.body,
      authorMod: msgRes.author_mod,
      path: msgRes.path,
      username: "",
      parentUsername: "",
    };

    console.log("HAHAHAHA", msgData.userId, msgData.parentUserId);

    const usernamePromise = getUsernamePromise(msgData.userId);
    const parentUsernamePromise = getUsernamePromise(msgData.parentUserId);

    await Promise.all([usernamePromise, parentUsernamePromise]).then((res) => {
      msgData.username = res[0].username;
      msgData.parentUsername = res[1] ? res[1].username : "";
    });

    return msgData;
  };
}
