import { IValueModel } from "@core/models";

export interface IGeneralProfileAvailabilityModel {
    days: IValueModel<number>[] | null;
    from: Date | null;
    to: Date | null;
}

export interface IGeneralProfileModel {
    photo: File | null;
    firstName: string;
    lastName: string;
    biography: string | null;
    birthday: Date | null;
    city: string;
    tags: string[] | null;
    freePlay: boolean;
    availability: IGeneralProfileAvailabilityModel;
}