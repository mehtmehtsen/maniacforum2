import { pg } from "../postgresService";
import { Msg } from "../msgs/msg";

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
      .one(
        `SELECT
          msgs.board_id AS "boardId",
          msgs.id,
          msgs.user_id AS "userId",
          msgs.parent_id AS "parentId",
          msgs.parent_user_id AS "parentUserId",
          msgs.timestamp,
          msgs.subject,
          msgs.body,
          msgs.author_mod AS "authorMod",
          msgs.path,
          users01.username AS username,
          users02.username AS "parentUsername"
        FROM msgs 
        LEFT JOIN users users01 ON users01.id=msgs.user_id 
        LEFT JOIN users users02 ON users02.id=msgs.parent_user_id 
        WHERE 
          msgs.id=$1
        ;`,
        msgId
      )
      .then(async (msg: Msg) => {
        out = msg;
      })
      .catch((error) => console.error(error));

    return out;
  }
}
