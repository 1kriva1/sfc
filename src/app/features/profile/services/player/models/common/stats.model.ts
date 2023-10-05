import { IStatPointsModel } from "./stat-points.model";
import { IStatValueModel } from "./stat-value.model";

export interface IStatsModel {
    Points: IStatPointsModel;
    Values: IStatValueModel[];
}