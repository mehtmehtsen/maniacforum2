import { Thread } from "./thread";
import { pg } from "../postgresService";

export class ThreadsService {
  public async getThreads(boardId: number): Promise<Thread[]> {
    let out: Thread[] = [];

    // get board's msgs with parent_id NULL (which are the threads)
    await pg
      .manyOrNone(
        `SELECT
          msgs.id, 
          msgs.user_id AS "userID", 
          msgs.timestamp, 
          msgs.subject,
          users.username AS username
        FROM msgs 
        LEFT JOIN users ON users.id=msgs.user_id
        WHERE parent_id IS NULL AND board_id=$1;`,
        boardId
      )
      .then(async (threads: Thread[]) => {
        out.push(...threads);
      })
      .catch((error) => console.error(error));

    return out;
  }
}
