import { pg } from "../postgresService";
import { TsoaResponse } from "@tsoa/runtime";

export class VerifyService {
  public async verify(
    token: string,
    validationErrorResponse: TsoaResponse<422, { reason: string }>
  ): Promise<void> {
    await pg
      .oneOrNone(`SELECT * FROM user_validation WHERE hash = $1`, [token])
      .then(async (r) => {
        if (r === null) {
          return validationErrorResponse(422, {
            reason: "Token not found. Did you already use it?",
          });
        }

        // set user to active
        await pg
          .none(`UPDATE users SET active = true WHERE id = $1`, [r.user_id])
          .then(async (r) => {
            console.log(r);
          });

        // remove user_validation entry
        await pg.none(`DELETE FROM user_validation WHERE user_id = $1`, [
          r.user_id,
        ]);
      });
  }
}
