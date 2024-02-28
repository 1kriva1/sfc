export interface IPageModel<I> {
    items: I[];
    total: number;
    next: boolean;
}