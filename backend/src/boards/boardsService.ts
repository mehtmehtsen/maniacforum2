import { Board } from "./board";
import { pg } from "../postgresService";

export class BoardsService {
  public async getBoards(): Promise<Board[]> {
    let out: Board[] = [];
    await pg
      .many("SELECT * FROM boards")
      .then((data: Board[]) => (out = data))
      .catch((error) => console.error(error));
    return out;
  }
}
