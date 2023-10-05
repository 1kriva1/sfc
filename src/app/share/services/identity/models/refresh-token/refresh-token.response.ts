import { BaseErrorResponse } from "@core/models/http/base-error.response";
import { IToken } from "../../../token/token.model";

export interface IRefreshTokenResponse extends BaseErrorResponse {
    Token: IToken;
}