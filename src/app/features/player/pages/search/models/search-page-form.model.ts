import { ISearchPageFootballFilterModel } from "../parts/filters/football/football-filter.model";
import { ISearchPageGeneralFilterModel } from "../parts/filters/general/general-filter.model";
import { ISearchPageStatsFilterModel } from "../parts/filters/stats/stats-filter.model";

export interface ISearchPageFormModel {
    name: string | null;
    general: ISearchPageGeneralFilterModel;
    football: ISearchPageFootballFilterModel;
    stats: ISearchPageStatsFilterModel;
}