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
import { SignUpResponse } from "../models/signup";
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
    @Query() password
  ): Promise<SignUpResponse> {
    return new SignupService().signup(email, username, password);
  }
}
