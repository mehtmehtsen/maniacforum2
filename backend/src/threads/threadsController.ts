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
import { Thread } from "./thread";
import { ThreadsService } from "./threadsService";

@Route("threads")
export class ThreadsController extends Controller {
  /**
   * Retrieves all threads in a board.
   * @param boardId id of said board.
   */
  @Get("{boardId}")
  public async getThreads(@Path() boardId: number): Promise<Thread[]> {
    return new ThreadsService().getThreads(boardId);
  }

  // @SuccessResponse("201", "Created") // Custom success response
  // @Post()
  // public async createThread(
  //   @Body() requestBody: ThreadCreationParams
  // ): Promise<void> {
  //   this.setStatus(201); // set return status 201
  //   new ThreadsService().create(requestBody);
  //   return;
  // }
}
