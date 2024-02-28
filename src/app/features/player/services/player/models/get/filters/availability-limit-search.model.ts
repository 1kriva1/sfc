import { ILimitSearchModel } from "@core/models";

export interface IAvailabilityLimitSearchModel extends ILimitSearchModel<string> {
    Days: number[] | null;
}