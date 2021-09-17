import { Msg } from "./msg";
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
  public async getMsgs(threadId: number): Promise<Msg[]> {
    let out: Msg[] = [];
    await pg
      .many(`SELECT * FROM msgs WHERE $1::text::ltree @> path`, threadId)
      .then((data: Msg[]) => (out = data))
      .catch((error) => console.error(error));
    return out;
  }
}
