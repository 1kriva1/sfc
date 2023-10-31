import { EditPagePersonalViewModel } from "./edit-page-personal-view.model";
import { IEditPageFormModel } from "../edit-page-form.model";
import { IValueModel } from "@core/models";
import { EditPageLocalization } from "../../edit.page.localization";
import { EditPageProgressViewModel } from "./edit-page-progress-view.model";
import { EditPageRaitingViewModel } from "./edit-page-raiting-view.model";
import { EnumService } from "@share/services";
import { StatsValueModel } from "../../../../models/stats-profile.model";

describe('Features.Profile.Page:ProfileEdit.ViewModels', () => {
    let enumServiceStub: Partial<EnumService> = {
        enums: {
            footballPositions: [
                { key: 0, value: 'Goalkeeper' },
                { key: 1, value: 'Defender' },
                { key: 2, value: 'Midfielder' },
                { key: 3, value: 'Forward' }
            ],
            gameStyles: [
                { key: 0, value: 'Defend' },
                { key: 1, value: 'Attacking' },
                { key: 2, value: 'Aggressive' },
                { key: 3, value: 'Control' },
                { key: 4, value: 'Counter Attacks' }
            ],
            statCategories: [
                { key: 0, value: 'Defend' },
                { key: 1, value: 'Shooting' },
                { key: 2, value: 'Passing' },
                { key: 3, value: 'Dribbling' },
                { key: 4, value: 'Defending' },
                { key: 5, value: 'Physicality' }
            ],
            statSkills: [
                { key: 0, value: 'Physical' },
                { key: 1, value: 'Mental' },
                { key: 2, value: 'Skill' },
            ],
            statTypes: [
                {
                    category: 0,
                    skill: 0,
                    key: 0,
                    value: "Acceleration",
                },
                {
                    category: 0,
                    skill: 0,
                    key: 1,
                    value: "Sprint Speed"
                },
                {
                    category: 1,
                    skill: 2,
                    key: 2,
                    value: "Positioning"
                },
                {
                    category: 1,
                    skill: 2,
                    key: 3,
                    value: "Finishing"
                },
                {
                    category: 1,
                    skill: 2,
                    key: 4,
                    value: "Shot Power"
                },
                {
                    category: 1,
                    skill: 2,
                    key: 5,
                    value: "Long Shots"
                },
                {
                    category: 1,
                    skill: 2,
                    key: 6,
                    value: "Volleys"
                },
                {
                    category: 1,
                    skill: 2,
                    key: 7,
                    value: "Penalties"
                },
                {
                    category: 2,
                    skill: 2,
                    key: 8,
                    value: "Vision"
                },
                {
                    category: 2,
                    skill: 2,
                    key: 9,
                    value: "Crossing"
                },
                {
                    category: 2,
                    skill: 2,
                    key: 10,
                    value: "FK. Accuracy"
                },
                {
                    category: 2,
                    skill: 2,
                    key: 11,
                    value: "Short Passing"
                },
                {
                    category: 2,
                    skill: 2,
                    key: 12,
                    value: "Long Passing"
                },
                {
                    category: 2,
                    skill: 2,
                    key: 13,
                    value: "Curve"
                },
                {
                    category: 3,
                    skill: 0,
                    key: 14,
                    value: "Agility"
                },
                {
                    category: 3,
                    skill: 0,
                    key: 15,
                    value: "Balance"
                },
                {
                    category: 3,
                    skill: 0,
                    key: 16,
                    value: "Reactions"
                },
                {
                    category: 3,
                    skill: 2,
                    key: 17,
                    value: "Ball Control"
                },
                {
                    category: 3,
                    skill: 2,
                    key: 18,
                    value: "Dribbling"
                },
                {
                    category: 3,
                    skill: 1,
                    key: 19,
                    value: "Composure"
                },
                {
                    category: 4,
                    skill: 2,
                    key: 20,
                    value: "Interceptions"
                },
                {
                    category: 4,
                    skill: 2,
                    key: 21,
                    value: "Heading Accuracy"
                },
                {
                    category: 4,
                    skill: 2,
                    key: 22,
                    value: "Def. Awareness"
                },
                {
                    category: 4,
                    skill: 2,
                    key: 23,
                    value: "Standing Tackle"
                },
                {
                    category: 4,
                    skill: 2,
                    key: 24,
                    value: "Sliding Tackle"
                },
                {
                    category: 5,
                    skill: 0,
                    key: 25,
                    value: "Jumping"
                },
                {
                    category: 5,
                    skill: 0,
                    key: 26,
                    value: "Stamina"
                },
                {
                    category: 5,
                    skill: 0,
                    key: 27,
                    value: "Strength"
                },
                {
                    category: 5,
                    skill: 1,
                    key: 28,
                    value: "Aggression"
                }
            ],
            workingFoots: [
                { key: 0, value: "Right" },
                { key: 1, value: "Left" },
                { key: 2, value: "Both" }
            ]
        }
    };

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
            const result = new EditPageRaitingViewModel(buildStatsValue(), enumServiceStub as EnumService),
                paceResult = result.model['0'];

            expect(paceResult.total).toEqual(200);
            expect(paceResult.value).toEqual(100);
            expect(paceResult.average).toEqual(50);
            expect(paceResult.count).toEqual(2);
            expect(paceResult.color).toEqual('#FFCE54');
        });

        fit('Should raiting has valid types value', () => {
            const result = new EditPageRaitingViewModel(buildStatsValue(), enumServiceStub as EnumService);

            expect(result.types['0']).toEqual({ label: 'Physical', total: 800, value: 400 });
            expect(result.types['1']).toEqual({ label: 'Mental', total: 200, value: 100 });
            expect(result.types['2']).toEqual({ label: 'Skill', total: 1900, value: 950 });
        });

        fit('Should raiting has valid total value', () => {
            const result = new EditPageRaitingViewModel(buildStatsValue(), enumServiceStub as EnumService);

            expect(result.total).toEqual(2900);
        });

        fit('Should raiting has valid value', () => {
            const result = new EditPageRaitingViewModel(buildStatsValue(), enumServiceStub as EnumService);

            expect(result.value).toEqual(1450);
        });

        fit('Should raiting has valid percentage value', () => {
            const result = new EditPageRaitingViewModel(buildStatsValue(), enumServiceStub as EnumService);

            expect(result.percentage).toEqual(50);
        });

        fit('Should raiting has valid stars value', () => {
            const result = new EditPageRaitingViewModel(buildStatsValue(), enumServiceStub as EnumService);

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
            stats: buildStatsValue()
        };
    }

    function buildStatsValue(): StatsValueModel {
        return {
            0: {
                0: 50,
                1: 50
            },
            1: {
                2: 50,
                3: 50,
                4: 50,
                5: 50,
                6: 50,
                7: 50
            },
            2: {
                8: 50,
                9: 50,
                10: 50,
                11: 50,
                12: 50,
                13: 50
            },
            3: {
                14: 50,
                15: 50,
                16: 50,
                17: 50,
                18: 50,
                19: 50
            },
            4: {
                20: 50,
                21: 50,
                22: 50,
                23: 50,
                24: 50
            },
            5: {
                25: 50,
                26: 50,
                27: 50,
                28: 50
            }
        };
    }
});