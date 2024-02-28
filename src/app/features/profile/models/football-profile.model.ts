import { IValueModel } from "@core/types";

export interface IFootballProfileModel {
    height: number | null;
    weight: number | null;
    position: IValueModel<number> | null;
    additionalPosition: IValueModel<number> | null;
    workingFoot: IValueModel<number> | null;
    number: number | null;
    gameStyle: IValueModel<number> | null;
    skill: number | null;
    weakFoot: number | null;
    physicalCondition: number | null;
}