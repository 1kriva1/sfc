export type StatsValueModel = { [category: number]: { [type: number]: number }; };

export interface IStatsPointsModel {
    available: number;
    used: number;
}

export interface IStatsProfileModel {
    points: IStatsPointsModel;
    value: StatsValueModel;
}