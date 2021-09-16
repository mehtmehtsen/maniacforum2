import { Thread } from "./thread";
import { pg } from "../postgresService";

// A post request should not contain an id.
export type ThreadCreationParams = Pick<Thread, "title">;

export class ThreadsService {
  public async getThreads(boardId: number): Promise<Thread[]> {
    let out: Array<Thread> = [];
    await pg
      .many("SELECT * FROM threads WHERE board_id=$1", boardId)
      .then((data: Array<Thread>) => (out = data))
      .catch((error) => console.error(error));
    console.log(boardId);
    return out;
  }

  // public get(id: number): Thread {
  //   return {
  //     id,
  //     title: "Mehts Thread",
  //   };
  // }

  // public create(threadCreationParams: ThreadCreationParams): Thread {
  //   return {
  //     id: Math.floor(Math.random() * 10000), // Random
  //     ...threadCreationParams,
  //   };
  // }
}
