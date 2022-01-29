import { pg } from "../postgresService";
import { hashSync } from "bcryptjs";
import { TsoaResponse } from "@tsoa/runtime";
import { MailService } from "../mail/mailService";

export class SignupService {
  public async signup(
    email: string,
    username: string,
    password: string,
    validationErrorResponse: TsoaResponse<422, { reason: string }>
  ): Promise<void> {
    let invalid = false;

    // check for password too short
    if (password.length < 7) {
      invalid = true;

      return validationErrorResponse(422, { reason: "Password is too short." });
    }
    if (invalid) return;

    // check for valid email address
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (!emailRegex.test(email)) {
      invalid = true;
      return validationErrorResponse(422, {
        reason: "This is not an email address!1",
      });
    }
    if (invalid) return;

    // check for email address already used
    await pg
      .manyOrNone(`SELECT email FROM users WHERE email=$1`, email)
      .then((r) => {
        if (r.length > 0) {
          invalid = true;

          return validationErrorResponse(422, {
            reason: "There already is an account with that email address.",
          });
        }
      });
    if (invalid) return;

    // check for username already used
    await pg
      .manyOrNone(`SELECT username FROM users WHERE username=$1`, username)
      .then((r) => {
        if (r.length > 0) {
          invalid = true;
          return validationErrorResponse(422, {
            reason: "There already is an account with that username.",
          });
        }
      });
    if (invalid) return;

    // save data in db
    const hashedPassword = hashSync(password, 10);
    await pg
      .one(
        `INSERT INTO users 
          (email, username, password, created_at, active)
        VALUES
          ($1, $2, $3, $4, $5)
        RETURNING id`,
        [email, username, hashedPassword, new Date(), false]
      )
      .then(async (r) => {
        console.log("createUser", r);
        // save data (id, hash, created_at) in user_activation table
        const token = hashSync(Math.random() * 100 + 54 + "", 10);
        pg.none(
          `INSERT INTO user_validation 
            (user_id, hash, created_at) 
          VALUES
            ($1, $2, $3)`,
          [r.id, token, new Date()]
        ).then(() => {
          const mailService = new MailService();
          mailService.send(email, "mup", `mip ${token}`);
        });
      })
      .catch((error) => console.error(error));

    return;
  }
}
