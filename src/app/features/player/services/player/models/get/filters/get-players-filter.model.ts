import { IGetPlayersProfileFilterModel } from "./get-players-profile-filter.model";
import { IGetPlayersStatsFilterModel } from "./get-players-stats-filter.model";

export interface IGetPlayersFilterModel {
    Profile: IGetPlayersProfileFilterModel;
    Stats: IGetPlayersStatsFilterModel;
}