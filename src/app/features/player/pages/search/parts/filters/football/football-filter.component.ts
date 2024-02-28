import { Component, OnInit } from "@angular/core";
import { ControlContainer, FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { EnumService } from "@share/services";
import { IBubbleModel } from "ngx-sfc-inputs";
import { BaseFilterComponent } from "../base-filter.component";
import { SearchPageFilterPart } from "../filter-part.enum";
import { FootballFilterConstants } from "./football-filter.constants";
import { FootballFilterLocalization } from "./football-filter.localization";
import { ISearchPageFootballFilterModel } from "./football-filter.model";

@Component({
    selector: 'sfc-football-filter',
    templateUrl: './football-filter.component.html',
    styleUrls: ['../base-filter.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class FootballFilterComponent
    extends BaseFilterComponent
    implements OnInit {

    SearchPageFilterPart = SearchPageFilterPart;
    Constants = FootballFilterConstants;
    Localization = FootballFilterLocalization;

    constructor(
        parent: FormGroupDirective,
        formBuilder: FormBuilder,
        public enumService: EnumService) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        const controls: IForm<ISearchPageFootballFilterModel> = {
            height: [{ from: this.Constants.FROM_HEIGHT_DEFAULT, to: this.Constants.TO_HEIGHT_DEFAULT }],
            weight: [{ from: this.Constants.FROM_WEIGHT_DEFAULT, to: this.Constants.TO_WEIGHT_DEFAULT }],
            positions: [null],
            workingFoot: [null],
            gameStyles: [null],
            physicalCondition: [null],
            skill: [null]
        };
        this.form.addControl(SearchPageFilterPart.Football, this.formBuilder.group(controls));
    }

    public POSITIONS: IBubbleModel[] = this.enumService.enums.footballPositions
        .map(d => ({ key: d.key, label: d.value, imageSrc: d.image }));

    public GAME_STYLES: IBubbleModel[] = this.enumService.enums.gameStyles
        .map(d => ({ key: d.key, label: d.value, imageSrc: d.image }));

    public generateHeightRangeLabel(from: number, to: number): string {
        return this.generateSizeRangeLabel(from, to, this.Localization.CM);
    }

    public generateWeightRangeLabel(from: number, to: number): string {
        return this.generateSizeRangeLabel(from, to, this.Localization.KG);
    }

    private generateSizeRangeLabel(from: number, to: number, units: string): string {
        return `${this.Localization.FROM}: ${from} - ${this.Localization.TO}: ${to} ${units}`;
    }
}