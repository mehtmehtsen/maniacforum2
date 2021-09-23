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
import { Msg } from "../msgs/msg";
import { MsgService } from "./msgService";

@Route("msg")
export class MsgController extends Controller {
  /**
   * Retrieves all messages of a thread.
   * @param msgId id of any msg.
   */
  @Get("{msgId}")
  public async getMsgs(@Path() msgId: number): Promise<Msg> {
    return new MsgService().getMsg(msgId);
  }
}
