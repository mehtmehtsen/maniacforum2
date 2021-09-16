import { Get, Path, Route } from "tsoa";
import { pg } from "../postgresService";

interface MsgResponse {
  thread_id: number;
  id: number;
  user_id: number;
  parent_id: number;
  parent_user_id: number;
  timestamp: string;
  title: string;
  body: string;
}

@Route("msgs")
export default class MsgsController {
  @Get("{threadId}")
  public async getMsgs(@Path() threadId: number): Promise<Array<MsgResponse>> {
    let out: Array<MsgResponse> = [];
    await pg
      .many(
        `WITH RECURSIVE msgtree AS (
        SELECT
          thread_id,
          id,
          user_id,
          parent_id,
          timestamp
          title,
          body
        FROM
          msgs
        WHERE
          thread_id = $1
        UNION
          SELECT
            m.thread_id,
            m.id,
            m.user_id,
            m.parent_id,
            m.timestamp
            m.title,
            m.body
          FROM
            msgs m
          INNER JOIN msgtree t ON m.parent_id = t.id
      ) SELECT
        *
      FROM
        msgs;`,
        threadId
      )
      .then((data: Array<MsgResponse>) => (out = data))
      .catch((error) => console.error(error));
    return out;
  }
}
