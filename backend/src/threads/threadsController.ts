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
import { ThreadsService, ThreadCreationParams } from "./threadsService";

@Route("threads")
export class ThreadsController extends Controller {
  @Get("{boardId}")
  public async getThreads(@Path() boardId: number): Promise<Thread> {
    return new ThreadsService().get(boardId);
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createThread(
    @Body() requestBody: ThreadCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    new ThreadsService().create(requestBody);
    return;
  }
}
