import { Component, OnInit } from "@angular/core";
import { ControlContainer, FormBuilder, FormGroupDirective, Validators } from "@angular/forms";
import { CommonConstants } from "@core/constants";
import { Locale } from "@core/enums";
import { IEnumModel, IForm } from "@core/types";
import { StorageService } from "@core/services";
import { getWeekDays } from "@core/utils";
import { Compare, Direction, nameof } from "ngx-sfc-common";
import { compareThan, IBubbleModel, maxArrayLength, ToggleType } from "ngx-sfc-inputs";
import { SearchPageFilterPart } from "../filter-part.enum";
import { GeneralFilterLocalization } from "./general-filter.localization";
import { GeneralFilterConstants } from "./general-filter.constants";
import { ISearchPageGeneralFilterAvailabilityModel, ISearchPageGeneralFilterModel } from "./general-filter.model";
import { BaseFilterComponent } from "../base-filter.component";

@Component({
    selector: 'sfc-general-filter',
    templateUrl: './general-filter.component.html',
    styleUrls: ['../base-filter.component.scss', './general-filter.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class GeneralFilterComponent
    extends BaseFilterComponent
    implements OnInit {

    SearchPageFilterPart = SearchPageFilterPart;
    ToggleType = ToggleType;
    Direction = Direction;
    Localization = GeneralFilterLocalization;
    Constants = GeneralFilterConstants;

    public locale!: Locale;

    public weekDays: IBubbleModel[] = [];

    constructor(
        parent: FormGroupDirective,
        formBuilder: FormBuilder,
        private storageService: StorageService) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        this.locale = this.storageService.get<Locale>(CommonConstants.LOCALE_KEY, Locale.English)!;
        this.weekDays = (getWeekDays() as IEnumModel<number>[]).map(d => ({ key: d.key, label: d.value }));

        const availabilityControls: IForm<ISearchPageGeneralFilterAvailabilityModel> = {
            days: [null],
            from: [null, [compareThan(nameof<ISearchPageGeneralFilterAvailabilityModel>('to'), Compare.Less)]],
            to: [null, [compareThan(nameof<ISearchPageGeneralFilterAvailabilityModel>('from'), Compare.More, true)]]
        }, controls: IForm<ISearchPageGeneralFilterModel> = {
            city: [null, [Validators.maxLength(this.Constants.MAX_CITY_LENGTH)]],
            hasPhoto: [null],
            freePlay: [null],
            tags: [null, [maxArrayLength(this.Constants.MAX_TAGS_LENGTH)]],
            years: [{ from: this.Constants.FROM_YEARS_DEFAULT, to: this.Constants.TO_YEARS_DEFAULT }],
            availability: this.formBuilder.group(availabilityControls)
        };
        this.form.addControl(SearchPageFilterPart.General, this.formBuilder.group(controls));
    }

    public generateYearsLabel(from: number, to: number): string {
        return `${GeneralFilterLocalization.INPUT.YEARS.MULTIPLE_LABEL_PART_1} ${from} - ${GeneralFilterLocalization.INPUT.YEARS.MULTIPLE_LABEL_PART_2} ${to} ${GeneralFilterLocalization.INPUT.YEARS.MULTIPLE_LABEL_PART_3}`;
    }
}