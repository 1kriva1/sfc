import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { remove, nameof, CheckmarkType } from 'ngx-sfc-common';
import { SelectItemModel } from 'ngx-sfc-inputs';
import { map, Observable, startWith } from 'rxjs';
import { IForm, IValueModel } from '@core/models';
import { IFootballProfileModel } from '../../../../models/football-profile.model';
import { ProfileEditPagePart } from '../../edit-page-part.enum';
import { IEditPageFormModel } from '../../models/edit-page-form.model';
import { BaseProfileEditComponent } from '../base-profile-edit.component';
import { FootballProfileEditConstants } from './football-profile-edit.constants';
import { FootballProfileEditLocalization } from './football-profile-edit.localization';
import { EnumService } from '@share/services';

@Component({
    selector: 'sfc-football-profile-edit',
    templateUrl: './football-profile-edit.component.html',
    styleUrls: ['../base-profile-edit.component.scss', './football-profile-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class FootballProfileEditComponent
    extends BaseProfileEditComponent
    implements OnInit {

    CheckmarkType = CheckmarkType;
    ProfileEditPagePart = ProfileEditPagePart;
    Localization = FootballProfileEditLocalization;
    Constants = FootballProfileEditConstants;

    public readonly MAX_HEIGHT_VALUE_VALIDATION: string =
        `${this.Localization.INPUT.HEIGHT.VALIDATIONS.MAX} ${this.Constants.MAX_SIZE_VALUE} ${this.Localization.CENTIMETERS}.`;

    public readonly MAX_WEIGHT_VALUE_VALIDATION: string =
        `${this.Localization.INPUT.WEIGHT.VALIDATIONS.MAX} ${this.Constants.MAX_SIZE_VALUE} ${this.Localization.KILOGRAMS}.`;

    public additionalPositions$!: Observable<SelectItemModel[]>;

    private get positionControl(): AbstractControl | null | undefined {
        return this.form.get(nameof<IEditPageFormModel>(ProfileEditPagePart.Football))
            ?.get(nameof<IFootballProfileModel>('position'));
    }

    private get additionalPositionControl(): AbstractControl | null | undefined {
        return this.form.get(nameof<IEditPageFormModel>(ProfileEditPagePart.Football))
            ?.get(nameof<IFootballProfileModel>('additionalPosition'));
    }
    constructor(
        public enumService: EnumService,
        parent: FormGroupDirective,
        formBuilder: FormBuilder
    ) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        const footballControls: IForm<IFootballProfileModel> = {
            height: [null, [
                Validators.min(this.Constants.MIN_SIZE_VALUE),
                Validators.max(this.Constants.MAX_SIZE_VALUE)
            ]],
            weight: [null, [
                Validators.min(this.Constants.MIN_SIZE_VALUE),
                Validators.max(this.Constants.MAX_SIZE_VALUE)
            ]],
            number: [null, [
                Validators.min(this.Constants.MIN_NUMBER_VALUE),
                Validators.max(this.Constants.MAX_NUMBER_VALUE)
            ]],
            position: [null],
            additionalPosition: [null],
            workingFoot: [null],
            gameStyle: [null],
            physicalCondition: [null, [
                Validators.min(this.Constants.MIN_RAITING_VALUE),
                Validators.max(this.Constants.MAX_RAITING_VALUE)
            ]],
            skill: [null, [
                Validators.min(this.Constants.MIN_RAITING_VALUE),
                Validators.max(this.Constants.MAX_RAITING_VALUE)
            ]],
            weakFoot: [null, [
                Validators.min(this.Constants.MIN_RAITING_VALUE),
                Validators.max(this.Constants.MAX_RAITING_VALUE)
            ]]
        };

        this.form.addControl(ProfileEditPagePart.Football, this.formBuilder.group(footballControls));

        this.initAdditionalPositions();
    }

    private initAdditionalPositions(): void {
        this.additionalPositions$ = this.positionControl?.valueChanges.pipe(
            startWith(this.positionControl?.value),
            map((value: IValueModel<number> | null) => {
                if (!value)
                    return this.enumService.enums.footballPositions;

                const newAdditionalPositions: SelectItemModel[] = Array.from(this.enumService.enums.footballPositions);

                remove(newAdditionalPositions, (item: SelectItemModel) => item.key === value.key);

                if (this.additionalPositionControl?.value?.key === value.key)
                    this.additionalPositionControl.setValue(null, { emitEvent: false });

                return newAdditionalPositions;
            })
        )!;
    }
}
