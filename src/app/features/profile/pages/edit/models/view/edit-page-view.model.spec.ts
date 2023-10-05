import { EditPagePersonalViewModel } from "./edit-page-personal-view.model";
import { IEditPageFormModel } from "../edit-page-form.model";
import { IValueModel } from "@core/models";
import { EditPageLocalization } from "../../edit.page.localization";
import { EditPageProgressViewModel } from "./edit-page-progress-view.model";
import { IStatsValueModel } from "../../../../models/stats-profile.model";
import { EditPageRaitingViewModel } from "./edit-page-raiting-view.model";
import { nameof } from "ngx-sfc-common";

describe('Features.Profile.Page:ProfileEdfit.ViewModels', () => {
    describe('Personal', () => {
        fit('Should first name has placeholder value', () => {
            const model: IEditPageFormModel = buildProfileFormValue('', '', '', null);

            const result = new EditPagePersonalViewModel(model);

            expect(result.firstName).toEqual(`[${EditPageLocalization.VIEW_MODEL.NAME}]`);
        });

        fit('Should first name has form value', () => {
            const model: IEditPageFormModel = buildProfileFormValue('FirstName', '', '', null);

            const result = new EditPagePersonalViewModel(model);

            expect(result.firstName).toEqual('FirstName');
        });

        fit('Should last name has placeholder value', () => {
            const model: IEditPageFormModel = buildProfileFormValue('', '', '', null);

            const result = new EditPagePersonalViewModel(model);

            expect(result.lastName).toEqual(`[${EditPageLocalization.VIEW_MODEL.SURNAME}]`);
        });

        fit('Should last name has form value', () => {
            const model: IEditPageFormModel = buildProfileFormValue('', 'LastName', '', null);

            const result = new EditPagePersonalViewModel(model);

            expect(result.lastName).toEqual('LastName');
        });

        fit('Should city has placeholder value', () => {
            const model: IEditPageFormModel = buildProfileFormValue('', '', '', null);

            const result = new EditPagePersonalViewModel(model);

            expect(result.city).toEqual(`[${EditPageLocalization.VIEW_MODEL.CITY}]`);
        });

        fit('Should city has form value', () => {
            const model: IEditPageFormModel = buildProfileFormValue('', '', 'City', null);

            const result = new EditPagePersonalViewModel(model);

            expect(result.city).toEqual('City');
        });

        fit('Should position has placeholder value', () => {
            const model: IEditPageFormModel = buildProfileFormValue('', '', '', null);

            const result = new EditPagePersonalViewModel(model);

            expect(result.position).toEqual({ key: null, value: `[${EditPageLocalization.VIEW_MODEL.POSITION}]` });
        });

        fit('Should position has form value', () => {
            const assertPosfition = { key: 1, value: 'Defender' },
                model: IEditPageFormModel = buildProfileFormValue('', '', '', { key: 1, value: 'Defender' });

            const result = new EditPagePersonalViewModel(model);

            expect(result.position).toEqual(assertPosfition);
        });
    });

    describe('Progress', () => {
        fit('Should general profile have default progress', () => {
            const model: IEditPageFormModel = buildProfileFormValue('', '', '');

            const result = new EditPageProgressViewModel(model);

            expect(result.general.properties).toEqual(11);
            expect(result.general.filled).toEqual(1);
            expect(result.general.percentage).toEqual(10);
        });

        fit('Should general profile have partially filled progress', () => {
            const model: IEditPageFormModel = buildProfileFormValue('First name', 'Last name', 'City',
                { key: 1, value: 'Defender' }, ['tag1', 'tag2']);

            const result = new EditPageProgressViewModel(model);

            expect(result.general.properties).toEqual(11);
            expect(result.general.filled).toEqual(5);
            expect(result.general.percentage).toEqual(46);
        });

        fit('Should football profile have default progress', () => {
            const model: IEditPageFormModel = buildProfileFormValue('', '', '');

            const result = new EditPageProgressViewModel(model);

            expect(result.football.properties).toEqual(10);
            expect(result.football.filled).toEqual(0);
            expect(result.football.percentage).toEqual(0);
        });

        fit('Should football profile have partially filled progress', () => {
            const model: IEditPageFormModel = buildProfileFormValue('First name', 'Last name', 'City',
                { key: 1, value: 'Defender' }, ['tag1', 'tag2']);

            const result = new EditPageProgressViewModel(model);

            expect(result.football.properties).toEqual(10);
            expect(result.football.filled).toEqual(1);
            expect(result.football.percentage).toEqual(10);
        });
    });

    describe('Raiting', () => {
        fit('Should raiting has valid model value', () => {
            const stats: IStatsValueModel = buildStatsValue();

            const result = new EditPageRaitingViewModel(stats),
                paceResult = result.model[nameof<IStatsValueModel>('pace')];

            expect(paceResult.total).toEqual(200);
            expect(paceResult.value).toEqual(100);
            expect(paceResult.average).toEqual(50);
            expect(paceResult.count).toEqual(2);
            expect(paceResult.color).toEqual('#FFCE54');
        });

        fit('Should raiting has valid types value', () => {
            const stats: IStatsValueModel = buildStatsValue();

            const result = new EditPageRaitingViewModel(stats);

            expect(result.types.physical).toEqual({ total: 800, value: 400 });
            expect(result.types.mental).toEqual({ total: 200, value: 100 });
            expect(result.types.skill).toEqual({ total: 1900, value: 950 });
        });

        fit('Should raiting has valid total value', () => {
            const stats: IStatsValueModel = buildStatsValue();

            const result = new EditPageRaitingViewModel(stats);

            expect(result.total).toEqual(2900);
        });

        fit('Should raiting has valid value', () => {
            const stats: IStatsValueModel = buildStatsValue();

            const result = new EditPageRaitingViewModel(stats);

            expect(result.value).toEqual(1450);
        });

        fit('Should raiting has valid percentage value', () => {
            const stats: IStatsValueModel = buildStatsValue();

            const result = new EditPageRaitingViewModel(stats);

            expect(result.percentage).toEqual(50);
        });

        fit('Should raiting has valid stars value', () => {
            const stats: IStatsValueModel = buildStatsValue();

            const result = new EditPageRaitingViewModel(stats);

            expect(result.stars).toEqual(3);
        });
    });

    function buildProfileFormValue(firstName: string, lastName: string, city: string,
        position: IValueModel<number> | null = null, tags: string[] | null = null)
        : IEditPageFormModel {
        return {
            photo: null,
            general: {
                firstName: firstName,
                lastName: lastName,
                biography: null,
                birthday: null,
                city: city,
                tags: tags,
                freePlay: false,
                availability: {
                    from: null,
                    to: null,
                    days: null
                }
            },
            football: {
                height: null,
                weight: null,
                position: position,
                additionalPosition: null,
                workingFoot: null,
                number: null,
                gameStyle: null,
                skill: null,
                weakFoot: null,
                physicalCondition: null,
            },
            stats: {
                pace: {
                    acceleration: 50,
                    sprintSpeed: 50
                },
                shooting: {
                    positioning: 50,
                    finishing: 50,
                    shotPower: 50,
                    longShots: 50,
                    volleys: 50,
                    penalties: 50
                },
                passing: {
                    vision: 50,
                    crossing: 50,
                    fkAccuracy: 50,
                    shortPassing: 50,
                    longPassing: 50,
                    curve: 50
                },
                dribbling: {
                    agility: 50,
                    balance: 50,
                    reactions: 50,
                    ballControl: 50,
                    dribbling: 50,
                    composure: 50
                },
                defending: {
                    interceptions: 50,
                    headingAccuracy: 50,
                    defAwarenence: 50,
                    standingTackle: 50,
                    slidingTackle: 50
                },
                physicality: {
                    jumping: 50,
                    stamina: 50,
                    strength: 50,
                    aggresion: 50
                }
            }
        };
    }

    function buildStatsValue(): IStatsValueModel {
        return {
            pace: {
                acceleration: 50,
                sprintSpeed: 50
            },
            shooting: {
                positioning: 50,
                finishing: 50,
                shotPower: 50,
                longShots: 50,
                volleys: 50,
                penalties: 50
            },
            passing: {
                vision: 50,
                crossing: 50,
                fkAccuracy: 50,
                shortPassing: 50,
                longPassing: 50,
                curve: 50
            },
            dribbling: {
                agility: 50,
                balance: 50,
                reactions: 50,
                ballControl: 50,
                dribbling: 50,
                composure: 50
            },
            defending: {
                interceptions: 50,
                headingAccuracy: 50,
                defAwarenence: 50,
                standingTackle: 50,
                slidingTackle: 50
            },
            physicality: {
                jumping: 50,
                stamina: 50,
                strength: 50,
                aggresion: 50
            }
        };
    }
});