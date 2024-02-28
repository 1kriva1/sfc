import { IGetPlayersItemFootballProfileModel } from "./get-players-item-football-profile.model";
import { IGetPlayersItemGeneralProfileModel } from "./get-players-item-general-profile.model";

export interface IGetPlayersItemProfileModel {
    General: IGetPlayersItemGeneralProfileModel;
    Football: IGetPlayersItemFootballProfileModel;
}