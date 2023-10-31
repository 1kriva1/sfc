import {
    any, convertUTCDateToLocalDate, firstOrDefault,
    isDefined, where, convertTimestampToDate, convertToBase64String, convertFromBase64String, distinct
} from "ngx-sfc-common";
import { Locale } from "@core/enums";
import { IStatValueModel } from "../services/player/models/common/stat-value.model";
import { ICreatePlayerRequest } from "../services/player/models/create/create.request";
import { IUpdatePlayerRequest } from "../services/player/models/update/update.request";
import { IEditPageFormModel } from "../pages/edit/models/edit-page-form.model";
import { IStatsModel } from "../pages/edit/parts/stats/services/stats.model";
import { IGetPlayerModel } from "../services/player/models/get/get-player.model";
import { IProfileModel as ServiceProfileModel } from "../services/player/models/common/profile.model";
import { IEnumModel } from "@core/models";
import { getWeekDays } from "@core/utils";
import { IProfileModel } from "../models/profile.model";
import { EnumService } from "@share/services";
import { StatsValueModel } from "../models";

export class ProfileEditPageMapper {

    public static async mapToServer(value: IEditPageFormModel, statPoints: IStatsModel)
        : Promise<ICreatePlayerRequest | IUpdatePlayerRequest> {
        return {
            Player: {
                Profile: {
                    General: ({
                        Availability: {
                            Days: value.general.availability.days?.map(d => d.key)!,
                            From: value.general.availability.from?.toLocaleTimeString(Locale.English, { hour12: false })!,
                            To: value.general.availability.to?.toLocaleTimeString(Locale.English, { hour12: false })!,
                        },
                        Biography: value.general.biography,
                        Birthday: value.general.birthday
                            ? convertUTCDateToLocalDate(value.general.birthday)
                            : null,
                        City: value.general.city,
                        FirstName: value.general.firstName,
                        FreePlay: value.general.freePlay,
                        LastName: value.general.lastName,
                        Tags: value.general.tags,
                        Photo: value.photo ? await convertToBase64String(value.photo) : null
                    }),
                    Football: {
                        Position: value.football.position?.key,
                        AdditionalPosition: value.football.additionalPosition?.key,
                        GameStyle: value.football.gameStyle?.key,
                        Height: value.football.height,
                        Weight: value.football.weight,
                        Number: value.football.number,
                        PhysicalCondition: value.football.physicalCondition,
                        Skill: value.football.skill,
                        WeakFoot: value.football.weakFoot,
                        WorkingFoot: value.football.workingFoot?.key,
                    }
                },
                Stats: {
                    Points: {
                        Available: statPoints.available,
                        Used: statPoints.used
                    },
                    Values: this.convertToServerStats(value.stats)
                }
            }
        }
    }

    public static async mapFromServer(value: IGetPlayerModel, enumService: EnumService): Promise<IProfileModel> {
        const profile: ServiceProfileModel = value.Profile,
            footballPosition = isDefined(profile.Football.Position)
                ? firstOrDefault(enumService.enums.footballPositions,
                    p => p.key == profile.Football.Position)
                : null,
            additionalPosition = isDefined(profile.Football.AdditionalPosition)
                ? firstOrDefault(enumService.enums.footballPositions,
                    p => p.key == profile.Football.AdditionalPosition)
                : null,
            workingFoot = isDefined(profile.Football.WorkingFoot)
                ? firstOrDefault(enumService.enums.workingFoots,
                    p => p.key == profile.Football.WorkingFoot)
                : null,
            gameStyle = isDefined(profile.Football.GameStyle)
                ? firstOrDefault(enumService.enums.gameStyles,
                    p => p.key == profile.Football.GameStyle)
                : null,
            weekDays = any(profile.General.Availability.Days)
                ? getWeekDays(profile.General.Availability.Days) as IEnumModel<number>[]
                : null;

        return {
            general: {
                firstName: profile.General.FirstName,
                lastName: profile.General.LastName,
                photo: profile.General.Photo ? await convertFromBase64String(profile.General.Photo, 'avatar') : null,
                city: profile.General.City,
                birthday: profile.General.Birthday ? new Date(profile.General.Birthday) : null,
                biography: profile.General.Biography,
                tags: profile.General.Tags,
                availability: {
                    days: weekDays,
                    from: profile.General.Availability.From ? convertTimestampToDate(profile.General.Availability.From) : null,
                    to: profile.General.Availability.To ? convertTimestampToDate(profile.General.Availability.To) : null
                },
                freePlay: profile.General.FreePlay
            },
            football: {
                height: profile.Football.Height,
                weight: profile.Football.Weight,
                position: footballPosition ? { key: footballPosition.key, value: footballPosition.value } : null,
                additionalPosition: additionalPosition ? { key: additionalPosition.key, value: additionalPosition.value } : null,
                workingFoot: workingFoot ? { key: workingFoot.key, value: workingFoot.value } : null,
                number: profile.Football.Number,
                gameStyle: gameStyle ? { key: gameStyle.key, value: gameStyle.value } : null,
                skill: profile.Football.Skill,
                weakFoot: profile.Football.WeakFoot,
                physicalCondition: profile.Football.PhysicalCondition
            },
            stats: {
                points: {
                    available: value.Stats.Points.Available,
                    used: value.Stats.Points.Used
                },
                value: this.convertFromServerStats(value.Stats.Values)
            }
        }
    }

    private static convertToServerStats(model: StatsValueModel): IStatValueModel[] {
        const result: IStatValueModel[] = [];

        Object.keys(model).forEach((key: string) => {
            const stat: any = model[+key];

            Object.keys(stat).forEach((keyStat: string) => {
                result.push({
                    Category: +key,
                    Type: +keyStat,
                    Value: stat[keyStat]
                })
            });
        })

        return result;
    }

    private static convertFromServerStats(stats: IStatValueModel[]): StatsValueModel {
        const categories = distinct(stats.map(stat => stat.Category)),
            result: StatsValueModel = {};

        categories.forEach(category => {
            const types = where(stats, stat => stat.Category === category)!;
            result[category] = types.reduce((controlAccumulator: any, item: IStatValueModel) =>
                ({ ...controlAccumulator, [item.Type]: item.Value }), {});
        });

        return result;
    }
}