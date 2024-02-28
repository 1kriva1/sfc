import { IStatValueModel } from "@share/models";
import { IStatPointsModel } from "./stat-points.model";

export interface IStatsModel {
    Points: IStatPointsModel;
    Values: IStatValueModel[];
}