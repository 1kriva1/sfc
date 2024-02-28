import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { HttpConstants } from "@core/constants";
import { BaseListResponse } from "@core/models";
import { of } from "rxjs";
import { mapPageResponse } from "./observable.utils";

describe('Core.Utils: Observable', () => {
    fit('Should map page response', () => {
        const mapFunction = (item: number) => `Test: ${item}`,
            response: Partial<HttpResponse<BaseListResponse<number>>> = {
                body: { Errors: null, Items: [1, 2, 3], Message: 'Success', Success: true },
                headers: new HttpHeaders().set(HttpConstants.PAGINATION_HEADER_KEY, JSON.stringify({
                    TotalCount: 10,
                    HasNextPage: true
                }))
            };

        of(response as HttpResponse<BaseListResponse<number>>)
            .pipe(mapPageResponse(mapFunction))
            .subscribe(result => {
                expect(result).toEqual({
                    items: ['Test: 1', 'Test: 2', 'Test: 3'],
                    total: 10,
                    next: true
                });
            });
    });
});