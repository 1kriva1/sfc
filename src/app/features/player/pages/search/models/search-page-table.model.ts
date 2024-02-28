import { ILimitModel } from "@core/models";
import { StatsValue } from "@share/types";

export interface IGeneralProfileAvailabilityModel extends ILimitModel<Date | null> {
    days: number[] | null;
}

export interface IGeneralProfileModel {
    photo: string | null;
    firstName: string;
    lastName: string;
    birthday: Date | null;
    city: string;
    tags: string[] | null;
    freePlay: boolean;
    availability: IGeneralProfileAvailabilityModel;
}

export interface IFootballProfileModel {
    height: number | null;
    weight: number | null;
    position: number | null;
    workingFoot: number | null;
    gameStyle: number | null;
    skill: number | null;
    physicalCondition: number | null;
}

export interface ISearchPageTableModel {
    id: number;
    general: IGeneralProfileModel;
    football: IFootballProfileModel;
    stats: StatsValue;
}