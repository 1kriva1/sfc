import { WeekDay } from "@angular/common";
import { any, firstItem, isDefined } from "ngx-sfc-common";
import { IEnumModel } from "../../types";

export function getWeekDays(include?: number[] | number | null): IEnumModel<number> | IEnumModel<number>[] {
    const values = getEnumValues(WeekDay, include).map((key: WeekDay) => {
        switch (key) {
            case WeekDay.Monday:
                return { key: key, value: $localize`:@@core.enum.weekday.monday:Monday` };
            case WeekDay.Tuesday:
                return { key: key, value: $localize`:@@core.enum.weekday.tuesday:Tuesday` };
            case WeekDay.Wednesday:
                return { key: key, value: $localize`:@@core.enum.weekday.wednesday:Wednesday` };
            case WeekDay.Thursday:
                return { key: key, value: $localize`:@@core.enum.weekday.thursday:Thursday` };
            case WeekDay.Friday:
                return { key: key, value: $localize`:@@core.enum.weekday.friday:Friday` };
            case WeekDay.Saturday:
                return { key: key, value: $localize`:@@core.enum.weekday.saturday:Saturday` };
            case WeekDay.Sunday:
                return { key: key, value: $localize`:@@core.enum.weekday.sunday:Sunday` };
        }
    });

    return buildEnumResult(values, include);
}

function getEnumValues(enumValue: any, include?: number[] | number | null): any {
    return Object.values(enumValue).filter((v) => {
        const includeValue: number[] | null = Array.isArray(include)
            ? include
            : include != null ? [include] : null;

        return !isNaN(Number(v))
            && (!any(includeValue) || (includeValue as number[]).indexOf(Number(v)) > -1)
    });
}

function buildEnumResult(values: any, include?: number[] | number | null)
    : IEnumModel<number> | IEnumModel<number>[] {
    return !isDefined(include) || Array.isArray(include)
        ? values : firstItem(values) as IEnumModel<number>;
}