import { Get, Route } from "tsoa";
import { pgp, pg } from "../postgresService";

interface BoardResponse {
  id: number;
  title: string;
}

interface BoardsResponse extends Array<BoardResponse> {}

@Route("boards")
export default class BoardsController {
  @Get("/")
  public async getMessage(): Promise<BoardsResponse> {
    let out = [{ id: -1, title: "wat" }];
    await pg
      .many("SELECT * FROM boards")
      .then((data) => (out = data))
      .catch((error) => (out = error));
    return out;
  }
}
