import { IGetPlayersFootballProfileFilterModel } from "./get-players-football-profile-filter.model";
import { IGetPlayersGeneralProfileFilterModel } from "./get-players-general-profile-filter.model";

export interface IGetPlayersProfileFilterModel {
    General: IGetPlayersGeneralProfileFilterModel;
    Football: IGetPlayersFootballProfileFilterModel;
}