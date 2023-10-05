
import { IFootballProfileModel } from "../../../models/football-profile.model";
import { IStatsValueModel } from "../../../models/stats-profile.model";
import { IGeneralProfileEditModel } from "../parts/general/general-profile-edit.model";

export interface IEditPageFormModel {
    photo: File | null;
    general: IGeneralProfileEditModel;
    football: IFootballProfileModel;
    stats: IStatsValueModel;
}