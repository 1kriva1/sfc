export interface IStatsModel {
    available: number;
    used: number;    
}

export interface IStatsExtendedModel extends IStatsModel {
    percentage: number;
    difference: number;
}