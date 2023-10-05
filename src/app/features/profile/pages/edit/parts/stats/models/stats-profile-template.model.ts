import { StatComposeType } from "../stat-compose-type.enum";

export interface IStatsItemMetadataModel {
    key: string;
    label: string;
    type: StatComposeType;
}

export interface IStatsProfileTemplateModel {
    key: string;
    label: string;
    items: IStatsItemMetadataModel[];
}