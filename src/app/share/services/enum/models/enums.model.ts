import { IEnumModel } from "@core/models";

export type IStatTypeEnumModel<T> = {
    key: T;
    value: string;
    category: number;
    skill: number;
}

export interface IEnumsModel {
    footballPositions: IEnumModel<number>[];
    gameStyles: IEnumModel<number>[];
    statCategories: IEnumModel<number>[];
    statSkills: IEnumModel<number>[];
    statTypes: IStatTypeEnumModel<number>[];
    workingFoots: IEnumModel<number>[];
}