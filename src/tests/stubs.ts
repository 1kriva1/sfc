import { EnumService } from "@share/services";

export const ENUM_SERVICE: Partial<EnumService> = {
    enums: {
        footballPositions: [
            { key: 0, value: 'Goalkeeper', image: 'app/core/assets/images/enums/position/0.png' },
            { key: 1, value: 'Defender', image: 'app/core/assets/images/enums/position/1.png' },
            { key: 2, value: 'Midfielder', image: 'app/core/assets/images/enums/position/2.png' },
            { key: 3, value: 'Forward', image: 'app/core/assets/images/enums/position/3.png' }
        ],
        gameStyles: [
            { key: 0, value: 'Defend', image: 'app/core/assets/images/enums/game-style/0.png' },
            { key: 1, value: 'Attacking', image: 'app/core/assets/images/enums/game-style/1.png' },
            { key: 2, value: 'Aggressive', image: 'app/core/assets/images/enums/game-style/2.png' },
            { key: 3, value: 'Control', image: 'app/core/assets/images/enums/game-style/3.png' },
            { key: 4, value: 'Counter Attacks', image: 'app/core/assets/images/enums/game-style/4.png' }
        ],
        workingFoots: [
            { key: 0, value: "Right", image: 'app/core/assets/images/enums/foot/0.png' },
            { key: 1, value: "Left", image: 'app/core/assets/images/enums/foot/1.png' },
            { key: 2, value: "Both", image: 'app/core/assets/images/enums/foot/2.png' }
        ],
        statCategories: [
            { key: 0, value: 'Pace' },
            { key: 1, value: 'Shooting' },
            { key: 2, value: 'Passing' },
            { key: 3, value: 'Dribling' },
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
        ]
    }
};