import { IRangeLimitValueModel } from "ngx-sfc-inputs";

export interface ISearchPageGeneralFilterAvailabilityModel {
    days: number[] | null;
    from: Date | null;
    to: Date | null;
}

export interface ISearchPageGeneralFilterModel {
    city: string | null;
    tags: string[] | null;
    years: IRangeLimitValueModel;
    availability: ISearchPageGeneralFilterAvailabilityModel;
    freePlay: boolean;
    hasPhoto: boolean;
}