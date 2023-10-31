export interface IStatsItemMetadataModel {
    key: number;
    label: string;
    skill: number;
}

export interface IStatsProfileTemplateModel {
    key: number;
    label: string;
    items: IStatsItemMetadataModel[];
}