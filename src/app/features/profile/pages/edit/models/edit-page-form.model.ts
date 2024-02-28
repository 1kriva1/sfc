
import { StatsValue } from "@share/types";
import { IFootballProfileModel } from "../../../models";
import { IGeneralProfileEditModel } from "../parts/general/general-profile-edit.model";

export interface IEditPageFormModel {
    photo: File | null;
    general: IGeneralProfileEditModel;
    football: IFootballProfileModel;
    stats: StatsValue;
}