import { nameof } from "ngx-sfc-common";
import { StatsProfileEditLocalization } from "./stats-profile-edit.localization";
import {
    IPaceStatModel, IShootingStatModel, IPassingStatModel,
    IDribblingStatModel, IDefendingStatModel, IPhysicalityStatModel, IStatsValueModel
} from "../../../../models";
import { IStatsProfileTemplateModel } from "./models/stats-profile-template.model";
import { StatComposeType } from "./stat-compose-type.enum";

export class StatsProfileEditConstants {
    static STATS: IStatsProfileTemplateModel[] = [
        {
            key: nameof<IStatsValueModel>('pace'),
            label: StatsProfileEditLocalization.STATS.PACE.LABEL,
            items: [
                {
                    key: nameof<IPaceStatModel>('acceleration'),
                    label: StatsProfileEditLocalization.STATS.PACE.ACCELERATION,
                    type: StatComposeType.Physical
                },
                {
                    key: nameof<IPaceStatModel>('sprintSpeed'),
                    label: StatsProfileEditLocalization.STATS.PACE.SPRINT_SPEED,
                    type: StatComposeType.Physical
                }
            ]
        },
        {
            key: nameof<IStatsValueModel>('shooting'),
            label: StatsProfileEditLocalization.STATS.SHOOTING.LABEL,
            items: [
                {
                    key: nameof<IShootingStatModel>('finishing'),
                    label: StatsProfileEditLocalization.STATS.SHOOTING.FINISHING,
                    type: StatComposeType.Skill
                },
                {
                    key: nameof<IShootingStatModel>('positioning'),
                    label: StatsProfileEditLocalization.STATS.SHOOTING.POSITIONING,
                    type: StatComposeType.Skill
                },
                {
                    key: nameof<IShootingStatModel>('shotPower'),
                    label: StatsProfileEditLocalization.STATS.SHOOTING.SHOT_POWER,
                    type: StatComposeType.Skill
                },
                {
                    key: nameof<IShootingStatModel>('longShots'),
                    label: StatsProfileEditLocalization.STATS.SHOOTING.LONG_SHOTS,
                    type: StatComposeType.Skill
                },
                {
                    key: nameof<IShootingStatModel>('volleys'),
                    label: StatsProfileEditLocalization.STATS.SHOOTING.VOLLEYS,
                    type: StatComposeType.Skill
                },
                {
                    key: nameof<IShootingStatModel>('penalties'),
                    label: StatsProfileEditLocalization.STATS.SHOOTING.PENALTIES,
                    type: StatComposeType.Skill
                }
            ]
        },
        {
            key: nameof<IStatsValueModel>('passing'),
            label: StatsProfileEditLocalization.STATS.PASSING.LABEL,
            items: [
                {
                    key: nameof<IPassingStatModel>('vision'),
                    label: StatsProfileEditLocalization.STATS.PASSING.VISION,
                    type: StatComposeType.Skill
                },
                {
                    key: nameof<IPassingStatModel>('crossing'),
                    label: StatsProfileEditLocalization.STATS.PASSING.CROSSING,
                    type: StatComposeType.Skill
                },
                {
                    key: nameof<IPassingStatModel>('fkAccuracy'),
                    label: StatsProfileEditLocalization.STATS.PASSING.FK_ACCURACY,
                    type: StatComposeType.Skill
                },
                {
                    key: nameof<IPassingStatModel>('shortPassing'),
                    label: StatsProfileEditLocalization.STATS.PASSING.SHORT_PASSING,
                    type: StatComposeType.Skill
                },
                {
                    key: nameof<IPassingStatModel>('longPassing'),
                    label: StatsProfileEditLocalization.STATS.PASSING.LONG_PASSING,
                    type: StatComposeType.Skill
                },
                {
                    key: nameof<IPassingStatModel>('curve'),
                    label: StatsProfileEditLocalization.STATS.PASSING.CURVE,
                    type: StatComposeType.Skill
                }
            ]
        },
        {
            key: nameof<IStatsValueModel>('dribbling'),
            label: StatsProfileEditLocalization.STATS.DRIBBLING.LABEL,
            items: [
                {
                    key: nameof<IDribblingStatModel>('agility'),
                    label: StatsProfileEditLocalization.STATS.DRIBBLING.AGILITY,
                    type: StatComposeType.Physical
                },
                {
                    key: nameof<IDribblingStatModel>('balance'),
                    label: StatsProfileEditLocalization.STATS.DRIBBLING.BALANCE,
                    type: StatComposeType.Physical
                },
                {
                    key: nameof<IDribblingStatModel>('reactions'),
                    label: StatsProfileEditLocalization.STATS.DRIBBLING.REACTIONS,
                    type: StatComposeType.Physical
                },
                {
                    key: nameof<IDribblingStatModel>('ballControl'),
                    label: StatsProfileEditLocalization.STATS.DRIBBLING.BALL_CONTROL,
                    type: StatComposeType.Skill
                },
                {
                    key: nameof<IDribblingStatModel>('dribbling'),
                    label: StatsProfileEditLocalization.STATS.DRIBBLING.DRIBBLING,
                    type: StatComposeType.Skill
                },
                {
                    key: nameof<IDribblingStatModel>('composure'),
                    label: StatsProfileEditLocalization.STATS.DRIBBLING.COMPOSURE,
                    type: StatComposeType.Mental
                }
            ]
        },
        {
            key: nameof<IStatsValueModel>('defending'),
            label: StatsProfileEditLocalization.STATS.DEFENDING.LABEL,
            items: [
                {
                    key: nameof<IDefendingStatModel>('interceptions'),
                    label: StatsProfileEditLocalization.STATS.DEFENDING.INTERCEPTIONS,
                    type: StatComposeType.Skill
                },
                {
                    key: nameof<IDefendingStatModel>('headingAccuracy'),
                    label: StatsProfileEditLocalization.STATS.DEFENDING.HEADING_ACCURACY,
                    type: StatComposeType.Skill
                },
                {
                    key: nameof<IDefendingStatModel>('defAwarenence'),
                    label: StatsProfileEditLocalization.STATS.DEFENDING.DEF_AWARENESS,
                    type: StatComposeType.Skill
                },
                {
                    key: nameof<IDefendingStatModel>('standingTackle'),
                    label: StatsProfileEditLocalization.STATS.DEFENDING.STANDING_TACKLE,
                    type: StatComposeType.Skill
                },
                {
                    key: nameof<IDefendingStatModel>('slidingTackle'),
                    label: StatsProfileEditLocalization.STATS.DEFENDING.SLIDING_TACKLE,
                    type: StatComposeType.Skill
                }
            ]
        },
        {
            key: nameof<IStatsValueModel>('physicality'),
            label: StatsProfileEditLocalization.STATS.PHYSICALITY.LABEL,
            items: [
                {
                    key: nameof<IPhysicalityStatModel>('jumping'),
                    label: StatsProfileEditLocalization.STATS.PHYSICALITY.JUMPING,
                    type: StatComposeType.Physical
                },
                {
                    key: nameof<IPhysicalityStatModel>('stamina'),
                    label: StatsProfileEditLocalization.STATS.PHYSICALITY.STAMINA,
                    type: StatComposeType.Physical
                },
                {
                    key: nameof<IPhysicalityStatModel>('strength'),
                    label: StatsProfileEditLocalization.STATS.PHYSICALITY.STRENGTH,
                    type: StatComposeType.Physical
                },
                {
                    key: nameof<IPhysicalityStatModel>('aggresion'),
                    label: StatsProfileEditLocalization.STATS.PHYSICALITY.AGGRESSION,
                    type: StatComposeType.Mental
                }
            ]
        }
    ];

    static INITIAL_STAT_VALUE: number = 50;
}