import { CommonConstants } from "ngx-sfc-common";
import { BaseResponse } from "../models/http/base.response";

export class HttpConstants {
    static CONTENT_TYPE: string = 'Content-Type';
    static ACCEPT_LANGUAGE: string = 'Accept-Language';
    static AUTHORIZATION_HEADER_KEY: string = 'Authorization';
    static BEARER_AUTHORIZATION_PART: string = 'Bearer';
    static FAILED_RESPONSE: BaseResponse = { Success: false, Message: CommonConstants.EMPTY_STRING }
}