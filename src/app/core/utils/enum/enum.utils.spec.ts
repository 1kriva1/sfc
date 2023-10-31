import { getWeekDays } from "./enum.utils";

describe('Core.Utils: Enum', () => {
    fit('Should return week days', () => {
        const result = getWeekDays();

        expect(result).toEqual([
            { key: 0, value: 'Sunday' },
            { key: 1, value: 'Monday' },
            { key: 2, value: 'Tuesday' },
            { key: 3, value: 'Wednesday' },
            { key: 4, value: 'Thursday' },
            { key: 5, value: 'Friday' },
            { key: 6, value: 'Saturday' }
        ]);
    });

    fit('Should return specific week day', () => {
        const result = getWeekDays(4);

        expect(result).toEqual({ key: 4, value: 'Thursday' });
    });

    fit('Should return specific week days', () => {
        const result = getWeekDays([1, 6]);

        expect(result).toEqual([
            { key: 1, value: 'Monday' },
            { key: 6, value: 'Saturday' }
        ]);
    });

    fit('Should not find specific week day', () => {
        const result = getWeekDays(22);

        expect(result).toBeNull();
    });
});