import { APP_INITIALIZER, Injectable } from "@angular/core";
import { EnumService } from "@share/services/enum/enum.service";
import { IEnumsModel } from "@share/services/enum/models/enums.model";
import { IdentityService } from "@share/services/identity/identity.service";
import { EMPTY, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class DataInitializer {

    constructor(private identityService: IdentityService, private enumService: EnumService) { }

    init(): Observable<IEnumsModel> {
        return this.identityService.isLoggedIn
            ? this.enumService.load()
            : EMPTY;
    }
}

function init() {
    return {
        provide: APP_INITIALIZER,
        useFactory: (initializer: DataInitializer) => () => initializer.init(),
        deps: [DataInitializer],
        multi: true,
    };
}

export const DataModule = { init: init };