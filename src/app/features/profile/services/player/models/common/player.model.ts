import { IProfileModel } from "./profile.model";
import { IStatsModel } from "./stats.model";

export interface IPlayerModel {
    Profile: IProfileModel;
    Stats: IStatsModel;
}