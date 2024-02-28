import { IStatValueModel } from "@share/models";
import { ENUM_SERVICE } from "@test/stubs";
import { StatsValue } from "@share/types";
import { convertFromServerStats, getMetadata, getModel, getRaiting, getStars, getTypes } from "./stats.utils";

describe('Share.Utils: Stats', () => {
    fit('Should return stars', () => {
        expect(getStars(50, 100)).toEqual(2.5);
    });

    fit('Should return rating', () => {
        const statValue = getStats();
        expect(getRaiting(statValue)).toEqual(50);
    });

    fit('Should return types', () => {
        const statValue = getStats();
        expect(getTypes(statValue, ENUM_SERVICE.enums?.statTypes!, ENUM_SERVICE.enums?.statSkills!))
            .toEqual([
                { label: 'Physical', total: 800, value: 400 },
                { label: 'Mental', total: 200, value: 100 },
                { label: 'Skill', total: 1900, value: 950 }
            ]);
    });

    fit('Should return model', () => {
        expect(getModel(ENUM_SERVICE.enums?.statTypes!, ENUM_SERVICE.enums?.statCategories!))
            .toEqual([
                {
                    key: 0,
                    label: "Pace",
                    items: [
                        { key: 0, label: 'Acceleration', skill: 0 },
                        { key: 1, label: 'Sprint Speed', skill: 0 }
                    ]
                },
                {
                    key: 1,
                    label: "Shooting",
                    items: [
                        { key: 2, label: 'Positioning', skill: 2 },
                        { key: 3, label: 'Finishing', skill: 2 },
                        { key: 4, label: 'Shot Power', skill: 2 },
                        { key: 5, label: 'Long Shots', skill: 2 },
                        { key: 6, label: 'Volleys', skill: 2 },
                        { key: 7, label: 'Penalties', skill: 2 }
                    ]
                },
                {
                    key: 2,
                    label: "Passing",
                    items: [
                        { key: 8, label: 'Vision', skill: 2 },
                        { key: 9, label: 'Crossing', skill: 2 },
                        { key: 10, label: 'FK. Accuracy', skill: 2 },
                        { key: 11, label: 'Short Passing', skill: 2 },
                        { key: 12, label: 'Long Passing', skill: 2 },
                        { key: 13, label: 'Curve', skill: 2 }
                    ]
                },
                {
                    key: 3,
                    label: "Dribling",
                    items: [

                        { key: 14, label: 'Agility', skill: 0 },
                        { key: 15, label: 'Balance', skill: 0 },
                        { key: 16, label: 'Reactions', skill: 0 },
                        { key: 17, label: 'Ball Control', skill: 2 },
                        { key: 18, label: 'Dribbling', skill: 2 },
                        { key: 19, label: 'Composure', skill: 1 }
                    ]
                },
                {
                    key: 4,
                    label: "Defending",
                    items: [
                        { key: 20, label: 'Interceptions', skill: 2 },
                        { key: 21, label: 'Heading Accuracy', skill: 2 },
                        { key: 22, label: 'Def. Awareness', skill: 2 },
                        { key: 23, label: 'Standing Tackle', skill: 2 },
                        { key: 24, label: 'Sliding Tackle', skill: 2 }
                    ]
                },
                {
                    key: 5,
                    label: "Physicality",
                    items: [
                        { key: 25, label: 'Jumping', skill: 0 },
                        { key: 26, label: 'Stamina', skill: 0 },
                        { key: 27, label: 'Strength', skill: 0 },
                        { key: 28, label: 'Aggression', skill: 1 }
                    ]
                }
            ]);
    });

    fit('Should return metadata', () => {
        const statValue = getStats();
        expect(getMetadata(statValue)).toEqual({
            0: { total: 200, value: 100, count: 2, average: 50, color: '#FFCE54' },
            1: { total: 600, value: 300, count: 6, average: 50, color: '#FFCE54' },
            2: { total: 600, value: 300, count: 6, average: 50, color: '#FFCE54' },
            3: { total: 600, value: 300, count: 6, average: 50, color: '#FFCE54' },
            4: { total: 500, value: 250, count: 5, average: 50, color: '#FFCE54' },
            5: { total: 400, value: 200, count: 4, average: 50, color: '#FFCE54' }
        });
    });

    fit('Should convert stats from server response', () => {
        expect(convertFromServerStats(getStatValues(), ENUM_SERVICE.enums?.statTypes!))
            .toEqual({
                0: { 0: 100, 1: 100 },
                1: { 2: 100, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100 },
                2: { 8: 100, 9: 100, 10: 100, 11: 100, 12: 100, 13: 100 },
                3: { 14: 100, 15: 100, 16: 100, 17: 100, 18: 100, 19: 100 },
                4: { 20: 100, 21: 100, 22: 100, 23: 100, 24: 100 },
                5: { 25: 100, 26: 100, 27: 100, 28: 100 }
            });
    });

    function getStats(): StatsValue {
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

    function getStatValues(): IStatValueModel[] {
        return [
            {
                Type: 0,
                Value: 100
            },
            {
                Type: 1,
                Value: 100
            },
            {
                Type: 2,
                Value: 100
            },
            {
                Type: 3,
                Value: 100
            },
            {
                Type: 4,
                Value: 100
            },
            {
                Type: 5,
                Value: 100
            },
            {
                Type: 6,
                Value: 100
            },
            {
                Type: 7,
                Value: 100
            },
            {
                Type: 8,
                Value: 100
            },
            {
                Type: 9,
                Value: 100
            },
            {
                Type: 10,
                Value: 100
            },
            {
                Type: 11,
                Value: 100
            },
            {
                Type: 12,
                Value: 100
            },
            {
                Type: 13,
                Value: 100
            },
            {
                Type: 14,
                Value: 100
            },
            {
                Type: 15,
                Value: 100
            },
            {
                Type: 16,
                Value: 100
            },
            {
                Type: 17,
                Value: 100
            },
            {
                Type: 18,
                Value: 100
            },
            {
                Type: 19,
                Value: 100
            },
            {
                Type: 20,
                Value: 100
            },
            {
                Type: 21,
                Value: 100
            },
            {
                Type: 22,
                Value: 100
            },
            {
                Type: 23,
                Value: 100
            },
            {
                Type: 24,
                Value: 100
            },
            {
                Type: 25,
                Value: 100
            },
            {
                Type: 26,
                Value: 100
            },
            {
                Type: 27,
                Value: 100
            },
            {
                Type: 28,
                Value: 100
            }
        ];
    }
});