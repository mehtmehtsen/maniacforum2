import { Thread } from "./thread";
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

export class ThreadsService {
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
}
