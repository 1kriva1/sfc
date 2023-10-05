import { IFootballProfileModel } from "./football-profile.model";
import { IGeneralProfileModel } from "./general-profile.model";
import { IStatsProfileModel } from "./stats-profile.model";

export interface IProfileModel {
    general: IGeneralProfileModel;
    football: IFootballProfileModel;
    stats: IStatsProfileModel;
}