import { BaseListResponse } from "@core/models";
import { IGetPlayersItemModel } from "./result/get-players-item.model";

export interface IGetPlayersResponse extends BaseListResponse<IGetPlayersItemModel> { }