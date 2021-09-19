import { Thread } from "./thread";
import { pg } from "../postgresService";
import { getUsernamePromise } from "../helpers/getUsername";
import { getLastMsgPromise } from "../helpers/getLastMsg";

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
      .manyOrNone(
        "SELECT id, user_id, timestamp, subject FROM msgs WHERE parent_id IS NULL AND board_id=$1;",
        boardId
      )
      .then(async (threadsRes: ThreadRes[]) => {
        // build promises to get additional data about each thread
        const threadPromises = threadsRes.map(async (threadRes) => {
          return this.getThreadDataPromise(threadRes);
        });

        // execute promises to get additional data about each thread
        await Promise.all(threadPromises).then((res) => {
          res.forEach((threadData) => {
            out.push(threadData);
          });
        });
      })
      .catch((error) => console.error(error));

    return out;
  }

  // get additional thread data
  getThreadDataPromise = async (threadRes: ThreadRes): Promise<Thread> => {
    const threadData: Thread = {
      id: threadRes.id,
      userId: threadRes.user_id,
      userName: "",
      timestamp: threadRes.timestamp,
      subject: threadRes.subject,
      lastMsgId: 0,
      lastMsgTimestamp: "",
    };

    const usernamePromise = getUsernamePromise(threadData.userId);
    const lastMsgPromise = getLastMsgPromise(threadData.id);

    await Promise.all([usernamePromise, lastMsgPromise]).then((res) => {
      threadData.userName = res[0].username;
      threadData.lastMsgId = res[1].id;
      threadData.lastMsgTimestamp = res[1].timestamp;
    });

    return threadData;
  };
}
