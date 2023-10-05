import { Injectable } from '@angular/core';
import { CommonConstants, Sequence } from 'ngx-sfc-common';
import { BehaviorSubject, Observable } from 'rxjs';
import { IStatsModel, IStatsExtendedModel } from './stats.model';

@Injectable({
    providedIn: 'any'
})
export class StatsService {

    public initial: IStatsModel = { available: 0, used: 0 };

    private statsSubject: BehaviorSubject<IStatsModel> =
        new BehaviorSubject<IStatsModel>(this.initial);

    public stats$!: Observable<IStatsModel>;

    public get stats(): IStatsExtendedModel {
        const total = this.statsSubject?.value.available + this.statsSubject?.value.used,
            percentage = this.statsSubject?.value.used / total;
        return {
            available: this.statsSubject?.value.available,
            used: this.statsSubject?.value.used,
            difference: Math.abs(this.statsSubject?.value.used - total),
            percentage: Math.ceil((isFinite(percentage) ? percentage : 1) * CommonConstants.FULL_PERCENTAGE)
        };
    }

    private get increaseModel(): IStatsModel {
        return { available: --this.statsSubject.value.available, used: ++this.statsSubject.value.used };
    }

    private get decreaseModel(): IStatsModel {
        return { available: ++this.statsSubject.value.available, used: Math.max(--this.statsSubject.value.used, 0) };
    }

    init(initial: IStatsModel): void {
        this.initial = Object.assign({}, initial);
        this.statsSubject = new BehaviorSubject<IStatsModel>(initial);
        this.stats$ = this.statsSubject.asObservable();
    }

    increase(): void {
        this.statsSubject.next(this.increaseModel);
    }

    decrease(): void {
        this.statsSubject.next(this.decreaseModel);
    }

    toggle(sequence: Sequence): void {
        const model: IStatsModel = sequence == Sequence.Next
            ? this.increaseModel : this.decreaseModel;

        this.statsSubject?.next(model);
    }
}
