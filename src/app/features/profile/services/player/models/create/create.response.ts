import { BaseErrorResponse } from "@core/models/http/base-error.response";
import { ICreatePlayerModel } from "./create-player.model";

export interface ICreatePlayerResponse extends BaseErrorResponse {
    Player: ICreatePlayerModel;
}