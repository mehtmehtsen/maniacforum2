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
import { Msg } from "./msg";
import { MsgsService } from "./msgsService";

@Route("msgs")
export class MsgsController extends Controller {
  /**
   * Retrieves all messages of a thread.
   * @param threadId id of any msg. For getting a thread, it should be the id of a msg with parent_id = null.
   */
  @Get("{threadId}")
  public async getMsgs(@Path() threadId: number): Promise<Msg[]> {
    return new MsgsService().getMsgs(threadId);
  }
}
