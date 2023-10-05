import { CommonConstants, firstOrDefault, sum, where } from "ngx-sfc-common";
import { getProgressColorDefaultFunc } from "ngx-sfc-components";
import { IStatsValueModel } from "../../../../models/stats-profile.model";
import { IStatsItemMetadataModel } from "../../parts/stats/models/stats-profile-template.model";
import { StatComposeType } from "../../parts/stats/stat-compose-type.enum";
import { StatsProfileEditConstants } from "../../parts/stats/stats-profile-edit.constants";

export interface EditPageRaitingStatModel {
    total: number;
    value: number;
    count: number;
    average: number;
    color: string;
}

export interface EditPageRaitingStatTypeItemModel {
    total: number;
    value: number;
}

export interface EditPageRaitingStatTypeModel {
    physical: EditPageRaitingStatTypeItemModel;
    skill: EditPageRaitingStatTypeItemModel;
    mental: EditPageRaitingStatTypeItemModel;
}

export class EditPageRaitingViewModel {
    private readonly MAX_STAT_VALUE: number = 100;

    private readonly MAX_STARS_VALUE: number = 5;

    public model: { [key: string]: EditPageRaitingStatModel };

    public total: number = 0;

    public value: number = 0;

    public percentage: number = 0;

    public stars: number = 0;

    public types: EditPageRaitingStatTypeModel;

    constructor(private stats: IStatsValueModel) {
        this.model = this.buildModel();
        this.total = Object.values(this.model).reduce((accumulator: number, model: EditPageRaitingStatModel) =>
            accumulator += model.total, 0);
        this.value = Object.values(this.model).reduce((accumulator: number, model: EditPageRaitingStatModel) =>
            accumulator += model.value, 0);
        this.percentage = Math.ceil(this.value / this.total * CommonConstants.FULL_PERCENTAGE);
        this.stars = Math.ceil(this.MAX_STARS_VALUE * this.value / this.total);
        this.types = this.buildTypes();
    }

    private buildModel(): { [key: string]: EditPageRaitingStatModel } {
        return Object.keys(this.stats)
            .reduce((statsAccumulator: any, key: string) => {
                const valueStats: any = Object.values((this.stats as any)[key]),
                    value = sum(valueStats, (value: number) => value),
                    average = Math.ceil(value / valueStats.length);

                return ({
                    ...statsAccumulator,
                    [key]: {
                        total: valueStats.length * this.MAX_STAT_VALUE,
                        value: value,
                        count: valueStats.length,
                        average: average,
                        color: getProgressColorDefaultFunc(average)
                    }
                });
            }, {});
    }

    private buildTypes(): EditPageRaitingStatTypeModel {
        const allStats = StatsProfileEditConstants.STATS.flatMap(model => model.items),
            physicalStats = where(allStats, (stat: IStatsItemMetadataModel) => stat.type == StatComposeType.Physical)!,
            skillStats = where(allStats, (stat: IStatsItemMetadataModel) => stat.type == StatComposeType.Skill)!,
            mentalStats = where(allStats, (stat: IStatsItemMetadataModel) => stat.type == StatComposeType.Mental)!;

        let allStatsList: { [key: string]: number } = {};

        Object.values(this.stats).forEach((group: any) => {
            return Object.keys(group).forEach(key => {
                allStatsList[key] = group[key];
            });
        });

        let physical: number = 0, skill: number = 0, mental: number = 0;

        Object.keys(allStatsList).forEach(key => {
            const stat = firstOrDefault(allStats, stat => stat.key == key);
            switch (stat?.type) {
                case StatComposeType.Physical:
                    physical += allStatsList[key];
                    break;
                case StatComposeType.Skill:
                    skill += allStatsList[key];
                    break;
                case StatComposeType.Mental:
                    mental += allStatsList[key];
                    break;
            }
        });

        return {
            physical: {
                total: physicalStats.length * CommonConstants.FULL_PERCENTAGE,
                value: physical
            },
            skill: {
                total: skillStats.length * CommonConstants.FULL_PERCENTAGE,
                value: skill
            },
            mental: {
                total: mentalStats.length * CommonConstants.FULL_PERCENTAGE,
                value: mental
            }
        }
    }
}