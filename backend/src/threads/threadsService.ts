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

interface ThreadRes {
  id: number;
  user_id: number;
  timestamp: string;
  subject: string;
}

export class ThreadsService {
  public async getThreads(boardId: number): Promise<Thread[]> {
    let out: Thread[] = [];

    // get board's msgs with parent_id NULL (which are the threads)
    await pg
      .many(
        "SELECT id, user_id, timestamp, subject FROM msgs WHERE parent_id IS NULL AND board_id=$1;",
        boardId
      )
      .then(async (threadsRes: ThreadRes[]) => {
        const threadPromises = threadsRes.map(async (thread) => {
          const threadData: Thread = {
            id: thread.id,
            userId: thread.user_id,
            userName: "",
            timestamp: thread.timestamp,
            subject: thread.subject,
            lastMsgId: 0,
            lastMsgTimestamp: "",
          };

          const usernamePromise = this.getUsernamePromise(threadData.userId);
          const lastMsgPromise = this.getLastMsgPromise(threadData.id);

          await Promise.all([usernamePromise, lastMsgPromise]).then((res) => {
            threadData.userName = res[0].username;
            threadData.lastMsgId = res[1].id;
            threadData.lastMsgTimestamp = res[1].timestamp;
          });
          return threadData;
        });
        await Promise.all(threadPromises).then((res) => {
          res.forEach((threadData) => {
            out.push(threadData);
          });
        });
      })
      .catch((error) => console.error(error));

    return out;
  }

  // get creator user name
  getUsernamePromise = async (userId: number): Promise<any> => {
    return pg
      .one("SELECT username FROM users WHERE id=$1;", userId)
      .then((userRes) => {
        return userRes;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // get thread's last msg data
  getLastMsgPromise = async (threadId: number): Promise<any> => {
    return pg
      .one(
        "SELECT id, timestamp FROM msgs WHERE $1::text::ltree @> path ORDER BY id DESC LIMIT 1;",
        threadId
      )
      .then((lastMsgRes) => {
        return lastMsgRes;
      })
      .catch((e) => console.log(e));
  };
}
