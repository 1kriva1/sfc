import { IEnumModel } from "@core/types";
import { empty } from "ngx-sfc-common";
import { ITagModel } from "ngx-sfc-components";

export interface IPlayersRowViewModel {
    photo: string;
    firstName: string;
    lastName: string;
    city: string;
    raiting: number;
    hasAvailableDays: boolean;
    hasAvailableTime: boolean;
    hasNoAvailableData: boolean;
    physicalCondition: number;
    height: number | null;
    weight: number | null;
    hasSize: boolean;
    age: number | null;
    stars: number;
    days: ITagModel[];
    availableTime: string;
    position: IEnumModel<number> | empty;
}