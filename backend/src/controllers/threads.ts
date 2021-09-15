import { Get, Path, Route } from "tsoa";
import { pg } from "../postgresService";

interface ThreadResponse {
  id: number;
  title: string;
}

@Route("threads")
export class ThreadsController {
  @Get("{boardId}")
  public async getThreads(
    @Path() boardId: number
  ): Promise<Array<ThreadResponse>> {
    let out: Array<ThreadResponse> = [];
    await pg
      .many("SELECT * FROM threads WHERE board_id=$1", boardId)
      .then((data: Array<ThreadResponse>) => (out = data))
      .catch((error) => console.error(error));
    console.log(boardId);
    return out;
  }
}
