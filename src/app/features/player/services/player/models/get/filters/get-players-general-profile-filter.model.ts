import { ILimitSearchModel } from "@core/models";
import { IAvailabilityLimitSearchModel } from "./availability-limit-search.model";

export interface IGetPlayersGeneralProfileFilterModel {
    Name: string | null;
    City: string | null;
    Tags: string[] | null;
    Years: ILimitSearchModel<number>;
    Availability: IAvailabilityLimitSearchModel;
    FreePlay: boolean;
    HasPhoto: boolean;
}