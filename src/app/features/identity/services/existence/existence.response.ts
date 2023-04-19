import { BaseResponse } from "src/app/share/models/base.response";

export interface IExistenceResponse extends BaseResponse{
    Exist: boolean;
}