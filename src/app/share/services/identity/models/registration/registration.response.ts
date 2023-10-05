import { BaseErrorResponse } from "@core/models/http/base-error.response";
import { IToken } from "../../../token/token.model";

export interface IRegistrationResponse extends BaseErrorResponse {
    UserId: string | null;
    Token: IToken;
}