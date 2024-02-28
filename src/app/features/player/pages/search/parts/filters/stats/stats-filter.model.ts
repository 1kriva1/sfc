import { IRangeLimitValueModel } from "ngx-sfc-inputs";

export interface ISearchPageStatsFilterModel {
    total: IRangeLimitValueModel;
    physical: IRangeLimitValueModel;
    mental: IRangeLimitValueModel;
    skill: IRangeLimitValueModel;
    raiting: number | null;
}