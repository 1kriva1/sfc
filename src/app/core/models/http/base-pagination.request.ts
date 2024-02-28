import { IPaginationModel } from "./pagination.model";
import { ISortingModel } from "./sorting.model";

export interface BasePaginationRequest<F> {
    Filter: F;
    Pagination: IPaginationModel;
    Sorting: ISortingModel[];
}