import { pg } from "../postgresService";
import { SignUpResponse } from "../models/signup";

export class SignupService {
  public async signup(
    email: string,
    username: string,
    password: string
  ): Promise<SignUpResponse> {
    await pg
      .any(
        `INSERT INTO users (email, username, password, created_at) VALUES ($1, $2, $3, $4)`,
        [email, username, password, new Date()]
      )
      .then(async (r) => {
        console.log("%c r", "background: #222;", r);
      })
      .catch((error) => console.error(error));

    return { response: "DINGE!1" };
  }
}
