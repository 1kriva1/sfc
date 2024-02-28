import { IEnumModel } from "@core/types";

export type IStatTypeEnumModel = {
    key: number;
    value: string;
    category: number;
    skill: number;
}

export interface IEnumsModel {
    footballPositions: IEnumModel<number>[];
    gameStyles: IEnumModel<number>[];
    statCategories: IEnumModel<number>[];
    statSkills: IEnumModel<number>[];
    statTypes: IStatTypeEnumModel[];
    workingFoots: IEnumModel<number>[];
}