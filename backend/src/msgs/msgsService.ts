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

  // public async getMsgs(threadId: number): Promise<Msg[]> {
  //   let out: Msg[] = [];
  //   await pg
  //     .many(
  //       `WITH RECURSIVE msgtree AS (
  //       SELECT
  //         threadId,
  //         id,
  //         userId,
  //         parentId,
  //         timestamp
  //         title,
  //         body
  //       FROM
  //         msgs
  //       WHERE
  //         threadId = $1
  //       UNION
  //         SELECT
  //           m.threadId,
  //           m.id,
  //           m.userId,
  //           m.parentId,
  //           m.timestamp
  //           m.title,
  //           m.body
  //         FROM
  //           msgs m
  //         INNER JOIN msgtree t ON m.parentId = t.id
  //     ) SELECT
  //       *
  //     FROM
  //       msgs;`,
  //       threadId
  //     )
  //     .then((data: Msg[]) => (out = data))
  //     .catch((error) => console.error(error));
  //   console.log(threadId);
  //   return out;
  // }
}
