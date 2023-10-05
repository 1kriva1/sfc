import { isValueModel } from "./common.utils";

describe('Core.Utils: Common', () => {
    fit('Should detect as value model', () => {
        const value: any = { key: 1, value: 'test' };

        expect(isValueModel(value)).toBeTrue();
    });

    fit('Should detect as not a value model', () => {
        const value: any = { key1: 1, value: 'test' };

        expect(isValueModel(value)).toBeFalse();
    });
});
