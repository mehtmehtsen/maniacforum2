import { pg } from "../postgresService";
import { TsoaResponse } from "@tsoa/runtime";

export class VerifyService {
  public async verify(
    token: string,
    validationErrorResponse: TsoaResponse<422, { reason: string }>
  ): Promise<void> {
    await pg
      .oneOrNone(`SELECT * FROM user_validation WHERE hash = '$1'`, [token])
      .then(async (r) => {
        // console.log(r);
        if (r.length === 0) {
          return validationErrorResponse(422, { reason: "Token not found" });
        }
      });
  }
}
