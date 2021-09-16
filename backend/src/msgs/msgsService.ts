import { Thread, Msg } from "./msg";
import { pg } from "../postgresService";

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
  public async getThreads(boardId: number): Promise<Thread[]> {
    let out: Thread[] = [];
    await pg
      .many(
        "SELECT * FROM msgs WHERE parent_id IS NULL AND board_id=$1;",
        boardId
      )
      .then((data: Thread[]) => (out = data))
      .catch((error) => console.error(error));
    console.log(boardId);
    return out;
  }

  public async getMsgs(threadId: number): Promise<Msg[]> {
    let out: Msg[] = [];
    await pg
      .many(
        `WITH RECURSIVE msgtree AS (
          SELECT
            board_id,
            id,
            user_id,
            parent_id,
            parent_user_id,
            timestamp,
            subject,
            body,
            author_mod
          FROM
            msgs
          WHERE
            id = $1 
          UNION
          SELECT
            m.board_id,
            m.id,
            m.user_id,
            m.parent_id,
            m.parent_user_id,
            m.timestamp,
            m.subject,
            m.body,
            m.author_mod
          FROM
            msgs m
          INNER JOIN msgtree t ON t.id = m.parent_id
        ) SELECT
          *
        FROM
          msgtree;`,
        threadId
      )
      .then((data: Thread[]) => (out = data))
      .catch((error) => console.error(error));
    return out;
  }
