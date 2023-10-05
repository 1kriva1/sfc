import { APP_INITIALIZER, Injectable } from "@angular/core";
import { catchError, EMPTY, Observable } from "rxjs";
import { IdentityService } from "@share/services/identity/identity.service";
import { PlayerService } from "@share/services/player/player.service";

@Injectable({
    providedIn: 'root',
})
export class PlayerInitializer {

    constructor(
        private identityService: IdentityService,
        private playerService: PlayerService
    ) { }

    init(): Observable<any> {
        return this.identityService.isLoggedIn
            ? this.playerService
                .get()
                .pipe(catchError(() => {
                    return this.identityService.logout();
                }))
            : EMPTY;
    }
}

function init() {
    return {
        provide: APP_INITIALIZER,
        useFactory: (initializer: PlayerInitializer) => () => initializer.init(),
        deps: [PlayerInitializer],
        multi: true,
    };
}

export const PlayerModule = { init: init };