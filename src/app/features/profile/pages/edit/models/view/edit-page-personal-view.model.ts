import { isDefined, isNullOrEmptyString } from "ngx-sfc-common";
import { ISelectValue } from "ngx-sfc-inputs";
import { EditPageLocalization } from "../../edit.page.localization";
import { IEditPageFormModel } from "../edit-page-form.model";

export class EditPagePersonalViewModel {

    public firstName!: string;

    public lastName!: string;

    public position: ISelectValue | null = null;

    public city!: string;

    constructor(model: IEditPageFormModel) {
        this.firstName = isNullOrEmptyString(model.general.firstName)
            ? this.buildPlaceholder(EditPageLocalization.VIEW_MODEL.NAME) : model.general.firstName;
        this.lastName = isNullOrEmptyString(model.general.lastName)
            ? this.buildPlaceholder(EditPageLocalization.VIEW_MODEL.SURNAME) : model.general.lastName;
        this.position = !isDefined(model.football.position)
            ? { key: null, value: this.buildPlaceholder(EditPageLocalization.VIEW_MODEL.POSITION) } : model.football.position;
        this.city = isNullOrEmptyString(model.general.city)
            ? this.buildPlaceholder(EditPageLocalization.VIEW_MODEL.CITY) : model.general.city;
    }

    private buildPlaceholder(value: string): string { return `[${value}]` }
}