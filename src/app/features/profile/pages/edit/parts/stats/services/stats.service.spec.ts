import { TestBed } from '@angular/core/testing';
import { Sequence } from 'ngx-sfc-common';
import { IStatsModel } from './stats.model';
import { StatsService } from './stats.service';

describe('Features.Profile.Service:Stats', () => {
    let service: StatsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StatsService);
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should init', () => {
        const model: IStatsModel = { available: 2, used: 1 };

        service.init(model);

        expect(service.initial).toEqual(model);
        expect(service.stats$).toBeDefined();
        service.stats$.subscribe(stats => expect(stats).toEqual(model));
    });

    fit('Should increase', () => {
        const model: IStatsModel = { available: 2, used: 1 };
        service.init(model);

        service.increase();

        service.stats$.subscribe(stats => expect(stats).toEqual({ available: 1, used: 2 }));
    });

    fit('Should decrease', () => {
        const model: IStatsModel = { available: 2, used: 1 };
        service.init(model);

        service.decrease();

        service.stats$.subscribe(stats => expect(stats).toEqual({ available: 3, used: 0 }));
    });

    fit('Should set used 0, if decrease is less than 0 decrease', () => {
        const model: IStatsModel = { available: 2, used: 0 };
        service.init(model);

        service.decrease();

        service.stats$.subscribe(stats => expect(stats).toEqual({ available: 3, used: 0 }));
    });

    fit('Should toggle next', () => {
        const model: IStatsModel = { available: 2, used: 1 };
        service.init(model);

        service.toggle(Sequence.Next);

        service.stats$.subscribe(stats => expect(stats).toEqual({ available: 1, used: 2 }));
    });

    fit('Should toggle previous', () => {
        const model: IStatsModel = { available: 2, used: 1 };
        service.init(model);

        service.toggle(Sequence.Previous);

        service.stats$.subscribe(stats => expect(stats).toEqual({ available: 3, used: 0 }));
    });

    fit('Should build extended model', () => {
        const model: IStatsModel = { available: 2, used: 1 };
        service.init(model);

        expect(service.stats).toEqual({
            available: 2,
            used: 1,
            difference: 2,
            percentage: 34
        })
    });

    fit('Should build extended model with 0 total', () => {
        const model: IStatsModel = { available: 0, used: 0 };
        service.init(model);

        expect(service.stats).toEqual({
            available: 0,
            used: 0,
            difference: 0,
            percentage: 100
        })
    });
});
