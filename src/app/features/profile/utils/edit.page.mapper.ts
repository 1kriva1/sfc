import {
    any, convertUTCDateToLocalDate, firstOrDefault,
    isDefined, where, convertTimestampToDate, convertToBase64String, convertFromBase64String
} from "ngx-sfc-common";
import { Locale, StatCategory, StatType } from "@core/enums";
import { IStatValueModel } from "../services/player/models/common/stat-value.model";
import { ICreatePlayerRequest } from "../services/player/models/create/create.request";
import { IUpdatePlayerRequest } from "../services/player/models/update/update.request";
import { IEditPageFormModel } from "../pages/edit/models/edit-page-form.model";
import { IStatsModel } from "../pages/edit/parts/stats/services/stats.model";
import { IStatsValueModel } from "../models/stats-profile.model";
import { IGetPlayerModel } from "../services/player/models/get/get-player.model";
import { IProfileModel as ServiceProfileModel } from "../services/player/models/common/profile.model";
import { IEnumModel } from "@core/models";
import { getFootballPositions, getFoots, getGameStyles, getWeekDays } from "@core/utils";
import { IProfileModel } from "../models/profile.model";

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

    public static async mapFromServer(value: IGetPlayerModel): Promise<IProfileModel> {
        const profile: ServiceProfileModel = value.Profile,
            footballPosition = isDefined(profile.Football.Position)
                ? getFootballPositions(profile.Football.Position) as IEnumModel<number>
                : null,
            additionalPosition = isDefined(profile.Football.AdditionalPosition)
                ? getFootballPositions(profile.Football.AdditionalPosition) as IEnumModel<number>
                : null,
            workingFoot = isDefined(profile.Football.WorkingFoot)
                ? getFoots(profile.Football.WorkingFoot) as IEnumModel<number>
                : null,
            gameStyle = isDefined(profile.Football.GameStyle)
                ? getGameStyles(profile.Football.GameStyle) as IEnumModel<number>
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

    private static convertToServerStats(model: IStatsValueModel): IStatValueModel[] {
        let result: IStatValueModel[] = [];

        Object.keys(model).forEach((key: any) => {
            const stat: any = (model as any)[key];

            Object.keys(stat).forEach((keyStat: any) => {
                const categoryKey = key[0].toUpperCase() + key.slice(1),
                    typeKey = keyStat[0].toUpperCase() + keyStat.slice(1);
                result.push({
                    Category: StatCategory[categoryKey],
                    Type: StatType[typeKey],
                    Value: stat[keyStat]
                })
            });
        })

        return result;
    }

    private static convertFromServerStats(stats: IStatValueModel[]): IStatsValueModel {
        const paceStats = where(stats, stat => stat.Category == StatCategory.Pace),
            defendingStats = where(stats, stat => stat.Category == StatCategory.Defending),
            dribblingStats = where(stats, stat => stat.Category == StatCategory.Dribbling),
            passingStats = where(stats, stat => stat.Category == StatCategory.Passing),
            physicalityStats = where(stats, stat => stat.Category == StatCategory.Physicality),
            shootingStats = where(stats, stat => stat.Category == StatCategory.Shooting);

        return {
            pace: {
                acceleration: firstOrDefault(paceStats, s => s.Type == StatType.Acceleration)?.Value!,
                sprintSpeed: firstOrDefault(paceStats, s => s.Type == StatType.SprintSpeed)?.Value!
            },
            defending: {
                defAwarenence: firstOrDefault(defendingStats, s => s.Type == StatType.DefAwarenence)?.Value!,
                headingAccuracy: firstOrDefault(defendingStats, s => s.Type == StatType.HeadingAccuracy)?.Value!,
                interceptions: firstOrDefault(defendingStats, s => s.Type == StatType.Interceptions)?.Value!,
                slidingTackle: firstOrDefault(defendingStats, s => s.Type == StatType.SlidingTackle)?.Value!,
                standingTackle: firstOrDefault(defendingStats, s => s.Type == StatType.StandingTackle)?.Value!
            },
            dribbling: {
                agility: firstOrDefault(dribblingStats, s => s.Type == StatType.Agility)?.Value!,
                balance: firstOrDefault(dribblingStats, s => s.Type == StatType.Balance)?.Value!,
                ballControl: firstOrDefault(dribblingStats, s => s.Type == StatType.BallControl)?.Value!,
                composure: firstOrDefault(dribblingStats, s => s.Type == StatType.Composure)?.Value!,
                dribbling: firstOrDefault(dribblingStats, s => s.Type == StatType.Dribbling)?.Value!,
                reactions: firstOrDefault(dribblingStats, s => s.Type == StatType.Reactions)?.Value!
            },
            passing: {
                crossing: firstOrDefault(passingStats, s => s.Type == StatType.Crossing)?.Value!,
                curve: firstOrDefault(passingStats, s => s.Type == StatType.Curve)?.Value!,
                fkAccuracy: firstOrDefault(passingStats, s => s.Type == StatType.FkAccuracy)?.Value!,
                longPassing: firstOrDefault(passingStats, s => s.Type == StatType.LongPassing)?.Value!,
                shortPassing: firstOrDefault(passingStats, s => s.Type == StatType.ShortPassing)?.Value!,
                vision: firstOrDefault(passingStats, s => s.Type == StatType.Vision)?.Value!
            },
            physicality: {
                aggresion: firstOrDefault(physicalityStats, s => s.Type == StatType.Aggresion)?.Value!,
                jumping: firstOrDefault(physicalityStats, s => s.Type == StatType.Jumping)?.Value!,
                stamina: firstOrDefault(physicalityStats, s => s.Type == StatType.Stamina)?.Value!,
                strength: firstOrDefault(physicalityStats, s => s.Type == StatType.Strength)?.Value!
            },
            shooting: {
                finishing: firstOrDefault(shootingStats, s => s.Type == StatType.Finishing)?.Value!,
                longShots: firstOrDefault(shootingStats, s => s.Type == StatType.LongShots)?.Value!,
                penalties: firstOrDefault(shootingStats, s => s.Type == StatType.Penalties)?.Value!,
                positioning: firstOrDefault(shootingStats, s => s.Type == StatType.Positioning)?.Value!,
                shotPower: firstOrDefault(shootingStats, s => s.Type == StatType.ShotPower)?.Value!,
                volleys: firstOrDefault(shootingStats, s => s.Type == StatType.Volleys)?.Value!
            }
        };
    }
}