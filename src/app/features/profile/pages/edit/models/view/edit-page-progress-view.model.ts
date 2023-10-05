import { isValueModel } from "@core/utils";
import { any, CommonConstants, isNullOrEmptyString, isObject } from "ngx-sfc-common";
import { IEditPageFormModel } from "../edit-page-form.model";

export class EditPageProgressViewModel {

    public general!: EditPageProgressModel;

    public football!: EditPageProgressModel;

    constructor(model: IEditPageFormModel) {
        this.general = new EditPageProgressModel({ ...model.general, ...{ photo: model.photo } });
        this.football = new EditPageProgressModel(model.football);
    }
}

export class EditPageProgressModel {

    public properties: number = 0;

    public filled: number = 0;

    public percentage: number = 0;

    constructor(model: any) {
        this.properties = this.getControlsCount(model);
        this.filled = this.getControlsCount(model, (value: any) =>
            Array.isArray(value) ? any(value) : !isNullOrEmptyString(value));
        this.percentage = Math.ceil(this.filled / this.properties * CommonConstants.FULL_PERCENTAGE)
    }

    private getControlsCount(value: any,
        predicate: ((value: any) => boolean) | null = null): number {
        let count = 0;

        if (isObject(value) && !isValueModel(value)) {
            Object.values(value).forEach(prop =>
                count += this.getControlsCount(prop, predicate));

            return count;
        }

        return predicate ? predicate(value) ? 1 : 0 : 1;
    }
}