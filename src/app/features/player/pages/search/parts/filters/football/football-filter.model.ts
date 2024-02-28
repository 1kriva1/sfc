import { ILimitModel } from "@core/models";
import { IValueModel } from "@core/types";

export interface ISearchPageFootballFilterModel {
    height: ILimitModel<number>;
    weight: ILimitModel<number>;
    positions: number[] | null;
    workingFoot: IValueModel<number> | null;
    gameStyles: number[] | null;
    skill: number | null;
    physicalCondition: number | null;
}