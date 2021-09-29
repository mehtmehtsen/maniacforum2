import { pg } from "../postgresService";
import { Msg } from "../models/msg";

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
      .many(
        `SELECT
          msgs.board_id AS "boardId",
          msgs.id,
          msgs.user_id AS "userId",
          msgs.parent_id AS "parentId",
          msgs.parent_user_id AS "parentUserId",
          msgs.created_at,
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
          $1::text::ltree @> path
        ;`,
        threadId
      )
      .then(async (msgsRes: Msg[]) => {
        out.push(...msgsRes);
      })
      .catch((error) => console.error(error));

    return out;
  }
}
