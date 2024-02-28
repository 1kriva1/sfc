import { StatsValue } from "@share/types";

export interface IStatsPointsModel {
    available: number;
    used: number;
}

export interface IStatsProfileModel {
    points: IStatsPointsModel;
    value: StatsValue;
}