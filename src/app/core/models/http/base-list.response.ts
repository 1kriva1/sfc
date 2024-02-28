import { BaseErrorResponse } from "./base-error.response";

export interface BaseListResponse<I> extends BaseErrorResponse {
    Items: I[];
}