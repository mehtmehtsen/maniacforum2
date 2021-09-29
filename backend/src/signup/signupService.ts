import { pg } from "../postgresService";
import { hashSync } from "bcryptjs";
import { SignUpResponse } from "../models/signup";

export class SignupService {
  public async signup(
    email: string,
    username: string,
    password: string
  ): Promise<SignUpResponse> {
    const hashedPassword = hashSync(password, 10);
    await pg
      .none(
        `INSERT INTO users (email, username, password, created_at) VALUES ($1, $2, $3, $4)`,
        [email, username, hashedPassword, new Date()]
      )
      .then(async (r) => {
        console.log("%c r", "background: #222;", r);
      })
      .catch((error) => console.error(error));

    return { response: "DINGE!1" };
  }
}
