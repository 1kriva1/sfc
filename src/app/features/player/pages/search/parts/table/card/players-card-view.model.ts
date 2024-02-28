import { IEnumModel } from "@core/types";
import { empty } from "ngx-sfc-common";
import { ITagModel } from "ngx-sfc-components";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { IStatsMetadataModel, IStatsModel, IStatsTypeModel } from "@share/models";

export interface IPlayersCardViewModel {
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
    freePlayIcon: IconDefinition;
    skill: number;
    tags: ITagModel[];
    gameStyle: IEnumModel<number> | empty;
    workingFoot: IEnumModel<number> | empty;
    types: IStatsTypeModel[];
    stats: IStatsModel[];
    metadata: { [key: string]: IStatsMetadataModel };
    progressColor: string;
}