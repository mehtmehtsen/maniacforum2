import { pg } from "../postgresService";

interface LastMsgRes {
  id: number;
  timestamp: string;
}

// get thread's last msg data
export const getLastMsgPromise = async (
  threadId: number
): Promise<LastMsgRes> => {
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
