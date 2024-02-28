export interface IStatsItemModel {
    key: number;
    label: string;
    skill: number;
}

export interface IStatsModel {
    key: number;
    label: string;
    items: IStatsItemModel[];
}