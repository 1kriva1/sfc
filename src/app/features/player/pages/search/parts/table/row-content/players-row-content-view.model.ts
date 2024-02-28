import { IEnumModel } from "@core/types";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { IStatsTypeModel } from "@share/models";
import { empty } from "ngx-sfc-common";
import { ITagModel } from "ngx-sfc-components";

export interface IPlayersRowContentViewModel {
    freePlayIcon: IconDefinition;
    skill: number;
    tags: ITagModel[];
    gameStyle: IEnumModel<number> | empty;
    workingFoot: IEnumModel<number> | empty;
    raiting: number;
    types: IStatsTypeModel[];
}