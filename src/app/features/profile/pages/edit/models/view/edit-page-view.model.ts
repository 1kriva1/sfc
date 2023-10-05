import { EditPagePersonalViewModel } from "./edit-page-personal-view.model";
import { EditPageProgressViewModel } from "./edit-page-progress-view.model";
import { EditPageRaitingViewModel } from "./edit-page-raiting-view.model";

export interface IEditPageViewModel {
    personal: EditPagePersonalViewModel;
    raiting: EditPageRaitingViewModel;
    progress: EditPageProgressViewModel;
}