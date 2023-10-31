import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Sequence, where } from 'ngx-sfc-common';
import { getProgressColorDynamicallyFunc } from 'ngx-sfc-components';
import { map, Observable, pairwise, startWith, Subscription } from 'rxjs';
import { ProfileEditPagePart } from '../../edit-page-part.enum';
import { BaseProfileEditComponent } from '../base-profile-edit.component';
import { StatsService } from './services/stats.service';
import { StatsProfileEditConstants } from './stats-profile-edit.constants';
import { EditPageRaitingViewModel } from '../../models/view/edit-page-raiting-view.model';
import { StatsProfileEditLocalization } from './stats-profile-edit.localization';
import { IStatsProfileTemplateModel, IStatsItemMetadataModel } from './models/stats-profile-template.model';
import { EnumService } from '@share/services';
import { IEnumModel } from '@core/models';
import { IStatTypeEnumModel } from '@share/services/enum/models/enums.model';

@Component({
    selector: 'sfc-stats-profile-edit',
    templateUrl: './stats-profile-edit.component.html',
    styleUrls: ['../base-profile-edit.component.scss', './stats-profile-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class StatsProfileEditComponent
    extends BaseProfileEditComponent
    implements OnInit, OnDestroy {

    Constants = StatsProfileEditConstants;
    Localization = StatsProfileEditLocalization;
    ProfileEditPagePart = ProfileEditPagePart;
    getProgressColorDynamicallyFunc = getProgressColorDynamicallyFunc;

    public vm$!: Observable<any>;

    public get isStatIncreaseAvailable(): boolean {
        return this.statsService.stats.difference > 0;
    }

    public get isStatDecreaseAvailable(): boolean {
        return (this.statsService.stats.used - this.statsService.initial.used) > 0;
    }

    public statsModel: IStatsProfileTemplateModel[] = [];

    private _statsControlsSubscriptions: Subscription[] = [];

    constructor(
        parent: FormGroupDirective,
        formBuilder: FormBuilder,
        private statsService: StatsService,
        private enumService: EnumService) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        this.statsModel = this.buildStatsModel();

        const statsGroup: FormGroup[] = this.buildStatsForm();

        this.form.addControl(ProfileEditPagePart.Stats, this.formBuilder.group(statsGroup));

        this.vm$ = this.form.valueChanges
            .pipe(
                startWith(this.form.value),
                map((model: any) => new EditPageRaitingViewModel(model.stats, this.enumService))
            );

        this.listenControls();
    }

    ngOnDestroy(): void {
        this._statsControlsSubscriptions.forEach(subscription => subscription.unsubscribe());
    }

    private listenControls(): void {
        const statsControls = (this.form.get(ProfileEditPagePart.Stats) as FormGroup).controls;

        Object.keys(statsControls).forEach((groupKey: string) => {
            const groupControls = (statsControls[groupKey] as FormGroup).controls;

            Object.keys(groupControls).forEach((key: string) => {
                const control = groupControls[key];

                this._statsControlsSubscriptions.push(control.valueChanges.pipe(
                    startWith(control.value),
                    pairwise(),
                    map(([prev, next]: [number, number]) => ({ prev, next }))
                ).subscribe((changes: any) => {
                    const sequence: Sequence = changes.next > changes.prev
                        ? Sequence.Next : Sequence.Previous;
                    this.statsService.toggle(sequence);
                }));
            })
        });
    }

    private buildStatsModel(): IStatsProfileTemplateModel[] {
        const categories: IEnumModel<number>[] = this.enumService.enums.statCategories,
            types: IStatTypeEnumModel<number>[] = this.enumService.enums.statTypes;

        return categories.map(category => ({
            key: category.key,
            label: category.value,
            items: where(types, type => type.category === category.key)!.map(type => ({
                key: type.key,
                label: type.value,
                skill: type.skill
            }))
        }));
    }

    private buildStatsForm(): FormGroup[] {
        return this.statsModel.reduce((groupAccumulator: any, stat: IStatsProfileTemplateModel) => {
            const controls: any =
                stat.items.reduce((controlAccumulator: any, item: IStatsItemMetadataModel) =>
                    ({ ...controlAccumulator, [item.key]: this.Constants.INITIAL_STAT_VALUE }), {});

            return ({ ...groupAccumulator, [stat.key]: this.formBuilder.group(controls) });
        }, {});
    }
}
