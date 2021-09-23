import { pg } from "../postgresService";
import { getUsernamePromise } from "../helpers/getUsernamePromise";
import { Msg } from "../msgs/msg";
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

export class MsgService {
  public async getMsg(msgId: number): Promise<Msg> {
    let out: Msg = {
      boardId: 0,
      id: 0,
      userId: 0,
      parentId: 0,
      parentUserId: 0,
      timestamp: "",
      subject: "",
      body: "",
      authorMod: false,
      path: "",
      username: "",
      parentUsername: "",
    };

    await pg
      .one(`SELECT * FROM msgs WHERE id=$1;`, msgId)
      .then(async (msgRes: MsgRes) => {
        out = await this.getMsgDataPromise(msgRes);
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
