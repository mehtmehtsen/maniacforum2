import { Get, Route } from "tsoa";
import { pg } from "../postgresService";

interface BoardResponse {
  id: number;
  title: string;
}

@Route("boards")
export default class BoardsController {
  @Get("/")
  public async getMessage(): Promise<Array<BoardResponse>> {
    let out: Array<BoardResponse>;
    await pg
      .many("SELECT * FROM boards")
      .then((data: Array<BoardResponse>) => (out = data))
      .catch((error) => console.error(error));
    return out;
  }
}
