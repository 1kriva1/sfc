import { IGeneralProfileAvailabilityModel } from "../../../../models/general-profile.model";

export interface IGeneralProfileEditModel {
    firstName: string;
    lastName: string;
    biography: string | null;
    birthday: Date | null;
    city: string;
    tags: string[] | null;
    freePlay: boolean;
    availability: IGeneralProfileAvailabilityModel;
}