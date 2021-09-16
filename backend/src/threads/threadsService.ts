import { Thread } from "./thread";

// A post request should not contain an id.
export type ThreadCreationParams = Pick<Thread, "title">;

export class ThreadsService {
  public get(id: number): Thread {
    return {
      id,
      title: "Mehts Thread",
    };
  }

  public create(threadCreationParams: ThreadCreationParams): Thread {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      ...threadCreationParams,
    };
  }
}
