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
  @Get("{threadId}")
  public async getMsgs(@Path() threadId: number): Promise<Msg[]> {
    return new MsgsService().getMsgs(threadId);
  }
}
