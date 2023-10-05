import { IValueModel } from "@core/models";

export function isValueModel(item: any): item is IValueModel<any> {
    return 'key' in item && 'value' in item;
}