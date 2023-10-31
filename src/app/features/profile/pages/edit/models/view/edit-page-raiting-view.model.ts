import { IEnumModel } from "@core/models";
import { EnumService } from "@share/services";
import { IStatTypeEnumModel } from "@share/services/enum/models/enums.model";
import { CommonConstants, sum, where } from "ngx-sfc-common";
import { getProgressColorDefaultFunc } from "ngx-sfc-components";
import { StatsValueModel } from "../../../../models/stats-profile.model";

export interface EditPageRaitingStatModel {
    total: number;
    value: number;
    count: number;
    average: number;
    color: string;
}

export interface EditPageRaitingStatTypeModel {
    label: string;
    total: number;
    value: number;
}

export class EditPageRaitingViewModel {
    private readonly MAX_STAT_VALUE: number = 100;

    private readonly MAX_STARS_VALUE: number = 5;

    public model: { [key: string]: EditPageRaitingStatModel };

    public total: number = 0;

    public value: number = 0;

    public percentage: number = 0;

    public stars: number = 0;

    public types: EditPageRaitingStatTypeModel[];

    constructor(private stats: StatsValueModel, private enumService: EnumService) {
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
                const valueStats: any[] = Object.values((this.stats as any)[key]),
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

    private buildTypes(): EditPageRaitingStatTypeModel[] {
        const types: IStatTypeEnumModel<number>[] = this.enumService.enums.statTypes,
            skills: IEnumModel<number>[] = this.enumService.enums.statSkills,
            groupedSkills: any = skills.reduce((groups, skill) => {
                (groups as any)[skill.value] = where(types, t => t.skill === skill.key)?.map(t => t.key)
                return groups;
            }, {});

        let allStatsList: { [key: string]: number } = {};

        Object.values(this.stats).forEach((group: any) => {
            Object.keys(group).forEach(key => {
                allStatsList[key] = group[key];
            });
        });

        const result: EditPageRaitingStatTypeModel[] = [];

        Object.keys(groupedSkills).forEach(skill => {
            let value = 0;
            const skillTypes = groupedSkills[skill];
            skillTypes.forEach((type: string) => value += allStatsList[type]);

            result.push({
                label: skill,
                total: skillTypes.length * CommonConstants.FULL_PERCENTAGE,
                value: value
            });
        });

        return result;
    }
}