import { ILimitSearchModel } from "@core/models";
import { IStatSkillLimitSearchModel } from "./stat-skill-limit-search.model";

export interface IGetPlayersStatsFilterModel {
    Total: ILimitSearchModel<number>;
    Raiting: number | null;
    Mental: IStatSkillLimitSearchModel;
    Physical: IStatSkillLimitSearchModel;
    Skill: IStatSkillLimitSearchModel;
}