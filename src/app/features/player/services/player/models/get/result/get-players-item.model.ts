import { IGetPlayersItemProfileModel } from "./get-players-item-profile.model";
import { IGetPlayersItemStatsModel } from "./get-players-item-stats.model";

export interface IGetPlayersItemModel {
    Id: number;
    Profile: IGetPlayersItemProfileModel;
    Stats: IGetPlayersItemStatsModel;
}