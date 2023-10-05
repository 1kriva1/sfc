import { WeekDay } from "@angular/common";
import { any, firstItem, isDefined } from "ngx-sfc-common";
import { GameStyle } from "../../enums";
import { Foot } from "../../enums/logic/foot.enum";
import { FootballPosition } from "../../enums/logic/football-position.enum";
import { IEnumModel } from "../../models";

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

export function getFootballPositions(include?: number[] | number | null): IEnumModel<number> | IEnumModel<number>[] {
    const values = getEnumValues(FootballPosition, include).map((key: FootballPosition) => {
        switch (key) {
            case FootballPosition.Goalkeeper:
                return {
                    key: key, 
                    value: $localize`:@@core.enum.football-position.goalkeeper:Goalkeeper`,
                    image: 'app/core/assets/images/enums/position/goalkeeper.png'
                };
            case FootballPosition.Defender:
                return {
                    key: key, 
                    value: $localize`:@@core.enum.football-position.defender:Defender`,
                    image: 'app/core/assets/images/enums/position/defender.png'
                };
            case FootballPosition.Midfielder:
                return {
                    key: key, 
                    value: $localize`:@@core.enum.football-position.midfielder:Midfielder`,
                    image: 'app/core/assets/images/enums/position/midfielder.png'
                };
            case FootballPosition.Forward:
                return {
                    key: key, 
                    value: $localize`:@@core.enum.football-position.forward:Forward`,
                    image: 'app/core/assets/images/enums/position/forward.png'
                };
        }
    });

    return buildEnumResult(values, include);
}

export function getFoots(include?: number[] | number | null): IEnumModel<number> | IEnumModel<number>[] {
    const values = getEnumValues(Foot, include).map((key: Foot) => {
        switch (key) {
            case Foot.Right:
                return {
                    key: key, 
                    value: $localize`:@@core.enum.foot.right:Right`,
                    image: 'app/core/assets/images/enums/foot/right.png'
                };
            case Foot.Left:
                return {
                    key: key, 
                    value: $localize`:@@core.enum.foot.left:Left`,
                    image: 'app/core/assets/images/enums/foot/left.png'
                };
            case Foot.Both:
                return {
                    key: key, 
                    value: $localize`:@@core.enum.foot.both:Both`,
                    image: 'app/core/assets/images/enums/foot/both.png'
                };
        }
    });

    return buildEnumResult(values, include);
}

export function getGameStyles(include?: number[] | number | null): IEnumModel<number> | IEnumModel<number>[] {
    const values = getEnumValues(GameStyle, include).map((key: GameStyle) => {
        switch (key) {
            case GameStyle.Defend:
                return {
                    key: key, 
                    value: $localize`:@@core.enum.game-style.defend:Defend`,
                    image: 'app/core/assets/images/enums/game-style/defend.png'
                };
            case GameStyle.Attacking:
                return {
                    key: key, 
                    value: $localize`:@@core.enum.game-style.attacking:Attacking`,
                    image: 'app/core/assets/images/enums/game-style/attack.png'
                };
            case GameStyle.Aggressive:
                return {
                    key: key, 
                    value: $localize`:@@core.enum.game-style.aggressive:Aggressive`,
                    image: 'app/core/assets/images/enums/game-style/aggressive.png'
                };
            case GameStyle.Control:
                return {
                    key: key, 
                    value: $localize`:@@core.enum.game-style.control:Control`,
                    image: 'app/core/assets/images/enums/game-style/control.png'
                };
            case GameStyle.CounterAttacks:
                return {
                    key: key, 
                    value: $localize`:@@core.enum.game-style.counter-attacks:Counter Attacks`,
                    image: 'app/core/assets/images/enums/game-style/counter_attacks.png'
                };
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