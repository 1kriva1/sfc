import { IPageLinksModel } from "./page-links.model";

export interface IPageMetadataModel {
    CurrentPage: number;
    TotalPages: number;
    PageSize: number;
    TotalCount: number;
    HasPreviousPage: boolean;
    HasNextPage: boolean;
    Links: IPageLinksModel;
}