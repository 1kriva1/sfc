import { ILimitSearchModel } from "@core/models";

export interface IStatSkillLimitSearchModel extends ILimitSearchModel<number> {
    Skill: number;
}