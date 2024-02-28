import { IEnumModel } from "@core/types";
import { IStatsTypeModel } from "@share/models/stats-type.model";
import { IStatsModel } from "@share/models/stats.model";
import { IStatTypeEnumModel } from "@share/services/enum/models/enums.model";
import { CommonConstants, sum, where } from "ngx-sfc-common";
import { getProgressColorDefaultFunc } from "ngx-sfc-components";
import { IStatsMetadataModel, IStatValueModel } from "../models";
import { StatsValue } from "../types";

const MAX_STAT_VALUE: number = 100;

export function getStars(value: number, total: number = CommonConstants.FULL_PERCENTAGE): number {
    const MAX_STARS_VALUE = 5;
    return MAX_STARS_VALUE * value / total;
}

export function getRaiting(value: StatsValue): number {
    const initial = { total: 0, value: 0 },
        result = Object.keys(value)
            .reduce((statsAccumulator: any, key: string) => {
                const valueStats: number[] = Object.values(value[+key]),
                    statsValue = sum(valueStats, (value: number) => value);
                return ({
                    total: statsAccumulator.total += valueStats.length * MAX_STAT_VALUE,
                    value: statsAccumulator.value += statsValue
                });
            }, initial);

    return Math.ceil(result.value / result.total * CommonConstants.FULL_PERCENTAGE);
}

export function getTypes(
    value: StatsValue,
    statTypes: IStatTypeEnumModel[],
    statSkills: IEnumModel<number>[]): IStatsTypeModel[] {
    const groupedSkills: any = statSkills.reduce((groups, skill) => {
        (groups as any)[skill.value] = where(statTypes, t => t.skill === skill.key)?.map(t => t.key)
        return groups;
    }, {});

    let allStatsList: { [key: string]: number } = {};

    Object.values(value).forEach((group: any) => {
        Object.keys(group).forEach(key => {
            allStatsList[key] = group[key];
        });
    });

    const result: IStatsTypeModel[] = [];

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

export function getModel(types: IStatTypeEnumModel[],
    categories: IEnumModel<number>[]): IStatsModel[] {
    return categories.map(category => ({
        key: category.key,
        label: category.value,
        items: where(types, type => type.category === category.key)!.map(type => ({
            key: type.key,
            label: type.value,
            skill: type.skill
        }))
    }));
}

export function getMetadata(value: StatsValue): { [key: string]: IStatsMetadataModel } {
    return Object.keys(value)
        .reduce((statsAccumulator: any, key: string) => {
            const valueStats: any[] = Object.values((value as any)[key]),
                statValue = sum(valueStats, (value: number) => value),
                average = Math.ceil(statValue / valueStats.length);

            return ({
                ...statsAccumulator,
                [key]: {
                    total: valueStats.length * MAX_STAT_VALUE,
                    value: statValue,
                    count: valueStats.length,
                    average: average,
                    color: getProgressColorDefaultFunc(average)
                }
            });
        }, {});
}

export function convertFromServerStats(
    stats: IStatValueModel[],
    statTypes: IStatTypeEnumModel[]): StatsValue {
    const result: StatsValue = {},
        categories = statTypes.reduce((r, a) => {
            r[a.category] = r[a.category] || [];
            r[a.category].push(a);
            return r;
        }, Object.create(null));

    Object.keys(categories).forEach((category: string) => {
        const types = categories[category].map((type: IStatTypeEnumModel) => type.key),
            categoryTypes = where(stats, stat => types.includes(stat.Type))!;

        result[+category] = categoryTypes.reduce((controlAccumulator: any, item: IStatValueModel) =>
            ({ ...controlAccumulator, [item.Type]: item.Value }), {})
    });

    return result;
}