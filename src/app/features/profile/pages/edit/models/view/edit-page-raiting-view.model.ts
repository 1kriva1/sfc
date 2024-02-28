import { IStatsMetadataModel, IStatsTypeModel } from "@share/models";
import { EnumService } from "@share/services";
import { StatsValue } from "@share/types";
import { getMetadata, getStars, getTypes } from "@share/utils";
import { CommonConstants } from "ngx-sfc-common";

export class EditPageRaitingViewModel {
    public model: { [key: string]: IStatsMetadataModel };

    public total: number = 0;

    public value: number = 0;

    public percentage: number = 0;

    public stars: number = 0;

    public types: IStatsTypeModel[];

    constructor(private stats: StatsValue, private enumService: EnumService) {
        this.model = getMetadata(stats);
        this.total = Object.values(this.model).reduce((accumulator: number, model: IStatsMetadataModel) =>
            accumulator += model.total, 0);
        this.value = Object.values(this.model).reduce((accumulator: number, model: IStatsMetadataModel) =>
            accumulator += model.value, 0);
        this.percentage = Math.ceil(this.value / this.total * CommonConstants.FULL_PERCENTAGE);
        this.stars = getStars(this.value, this.total);
        this.types = getTypes(stats, this.enumService.enums.statTypes, this.enumService.enums.statSkills);
    }
}