import { pg } from "../postgresService";
import { getUsernamePromise } from "../helpers/getUsernamePromise";
import { Msg } from "./msg";
import { MsgRes } from "../resInterfaces/resInterfaces";

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
            out.push(msgData);
          });
        });
      })
      .catch((error) => console.error(error));

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

    const usernamePromise = getUsernamePromise(msgData.userId);
    const parentUsernamePromise = getUsernamePromise(msgData.parentUserId);

    await Promise.all([usernamePromise, parentUsernamePromise])
      .then((res) => {
        msgData.username = res[0].username;
        msgData.parentUsername = res[1] ? res[1].username : "";
      })
      .catch((error) => {
        console.log(error);
      });

    return msgData;
  };
}
