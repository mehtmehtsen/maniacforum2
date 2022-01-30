import { Controller, Post, Query, Res, Route, TsoaResponse } from "tsoa";
import { VerifyService } from "./verifyService";

@Route("verify")
export class VerifyController extends Controller {
  /**
   * Email verification for newly registered users
   * @param token from the link that got sent to the user's email address.
   */
  @Post()
  public async verify(
    @Query() token,
    @Res() validationErrorResponse: TsoaResponse<422, { reason: string }>
  ): Promise<void> {
    return new VerifyService().verify(token, validationErrorResponse);
  }
}
