import { BaseErrorResponse } from "src/app/share/models/base-error.response";
import { IToken } from "../../../token/token.model";

export interface IRegistrationResponse extends BaseErrorResponse {
    UserId: string | null;
    Token: IToken;
}