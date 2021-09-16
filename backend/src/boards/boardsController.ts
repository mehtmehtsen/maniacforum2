import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { Board } from "./board";
import { BoardsService } from "./boardsService";

@Route("boards")
export class BoardsController extends Controller {
  @Get()
  public async getBoards(): Promise<Board[]> {
    return new BoardsService().getBoards();
  }
}
