import { buildPath } from "./routing.utils";

describe('Core.Utils: Routing', () => {
    fit('Should build path', () => {
        expect(buildPath('test')).toEqual('/test');
    });
});
