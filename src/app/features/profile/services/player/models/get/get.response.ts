import { BaseErrorResponse } from "@core/models/http/base-error.response";
import { IGetPlayerModel } from "./get-player.model";

export interface IGetPlayerResponse extends BaseErrorResponse {
    Player: IGetPlayerModel;
}