import { BaseErrorResponse } from "@core/models/http/base-error.response";
import { IToken } from "../../../token/token.model";

export interface ILoginResponse extends BaseErrorResponse {
    UserId: string | null;
    Token: IToken;
}