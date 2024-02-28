import { IValueModel } from "@core/types";
import { empty } from "ngx-sfc-common";

export interface IPlayerInfoPanelModel {
    photo?: string | empty;
    raiting: number;
    firstName?: string | empty;
    lastName?: string | empty;
    city?: string | empty;
    position?: IValueModel<number> | empty;
    age?: number | empty;
}