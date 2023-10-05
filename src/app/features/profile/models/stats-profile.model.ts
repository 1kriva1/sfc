export interface IPaceStatModel {
    acceleration: number;
    sprintSpeed: number;
}

export interface IShootingStatModel {
    positioning: number;
    finishing: number;
    shotPower: number;
    longShots: number;
    volleys: number;
    penalties: number;
}

export interface IPassingStatModel {
    vision: number;
    crossing: number;
    fkAccuracy: number;
    shortPassing: number;
    longPassing: number;
    curve: number;
}

export interface IDribblingStatModel {
    agility: number;
    balance: number;
    reactions: number;
    ballControl: number;
    dribbling: number;
    composure: number;
}

export interface IDefendingStatModel {
    interceptions: number;
    headingAccuracy: number;
    defAwarenence: number;
    standingTackle: number;
    slidingTackle: number;
}

export interface IPhysicalityStatModel {
    jumping: number;
    stamina: number;
    strength: number;
    aggresion: number;
}

export interface IStatsValueModel {
    pace: IPaceStatModel;
    shooting: IShootingStatModel;
    passing: IPassingStatModel;
    dribbling: IDribblingStatModel;
    defending: IDefendingStatModel;
    physicality: IPhysicalityStatModel;
}

export interface IStatsPointsModel {
    available: number;
    used: number;
}

export interface IStatsProfileModel {
    points: IStatsPointsModel;
    value: IStatsValueModel;
}