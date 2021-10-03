import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Res,
  Route,
  SuccessResponse,
  TsoaResponse,
} from "tsoa";
import { SignupService } from "./signupService";

@Route("signup")
export class SignupController extends Controller {
  /**
   *
   *
   */
  @Post()
  public async signup(
    // @Path() msgId: number,
    @Query() email,
    @Query() username,
    @Query() password,
    @Res() validationErrorResponse: TsoaResponse<422, { reason: string }>
  ): Promise<void> {
    return new SignupService().signup(
      email,
      username,
      password,
      validationErrorResponse
    );
  }
}
