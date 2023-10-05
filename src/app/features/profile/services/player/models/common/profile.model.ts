import { IFootballProfile } from "./football-profile.model";
import { IGeneralProfile } from "./general-profile.model";

export interface IProfileModel {
    General: IGeneralProfile;
    Football: IFootballProfile;
}