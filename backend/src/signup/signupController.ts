import { Controller, Post, Query, Res, Route, TsoaResponse } from "tsoa";
import { SignupService } from "./signupService";

@Route("signup")
export class SignupController extends Controller {
  /**
   * Initial sign up for new users. User will have to verify email address
   * by clicking the link that got sent to it.
   * @param email user's email address. Mustn't be present in DB for it to be accepted.
   * @param username desired username. Must be 3-16 chars and not already present in DB
   * @param password password. Minimum length of 7 chars.
   */
  @Post()
  public async signup(
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
