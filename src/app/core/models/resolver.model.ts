export interface IResolverModel<T> {
    result: T | null;
    success: boolean;
    message?: string | null
}