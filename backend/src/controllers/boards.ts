import { Get, Route } from "tsoa";
import { pgp, pg } from "../postgresService";

interface BoardResponse {
  message: string;
}

@Route("boards")
export default class BoardsController {
  @Get("/")
  public async getMessage(): Promise<BoardResponse> {
    let out = { message: "wat" };
    await pg
      .many("SELECT * FROM boards")
      .then((data) => {
        out = { message: JSON.stringify(data) };
      })
      .catch((error) => {
        out = { message: JSON.stringify(error) };
      });
    return out;
  }
}
