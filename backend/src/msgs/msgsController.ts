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
import { Thread, Msg } from "./msg";
import { MsgsService } from "./msgsService";

@Route("threads")
export class MsgsController extends Controller {
  @Get("{boardId}")
  public async getThreads(@Path() boardId: number): Promise<Thread[]> {
    return new MsgsService().getThreads(boardId);
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
