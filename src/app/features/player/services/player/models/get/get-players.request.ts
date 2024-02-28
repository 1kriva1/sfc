
import { BasePaginationRequest } from "@core/models";
import { IGetPlayersFilterModel } from "./filters/get-players-filter.model";

export interface IGetPlayersRequest extends BasePaginationRequest<IGetPlayersFilterModel> { }