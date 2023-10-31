import { BaseErrorResponse } from "@core/models/http/base-error.response";

export interface IDataValueModel {
    Id: number;
    Title: string;
}

export interface IStatTypeDataValueModel extends IDataValueModel {
    Category: number;
    Skill: number;
}

export interface IGetDataResponse extends BaseErrorResponse {
    FootballPositions: IDataValueModel[];
    GameStyles: IDataValueModel[];
    StatCategories: IDataValueModel[];
    StatSkills: IDataValueModel[];
    StatTypes: IStatTypeDataValueModel[];
    WorkingFoots: IDataValueModel[];
}