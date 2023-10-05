import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { isNullOrEmptyString } from 'ngx-sfc-common';
import { Observable } from 'rxjs';
import { RoutKey } from '@core/enums';
import { buildPath } from '@core/utils';
import { PlayerService } from '@share/services/player/player.service';

@Injectable({ providedIn: 'root' })
export class CanActivateOnlyUserProfile implements CanActivate {

    constructor(private playerService: PlayerService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot)
        : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if (this.playerService.playerCreated) {
            const playerId: string | null = route.paramMap.get('id');

            if (isNullOrEmptyString(playerId))
                return this.redirectToPlayerProfile();

            const storedPlayerId: number = this.playerService.playerId.value!,
                urlPlayerId: number = +playerId!;

            return storedPlayerId != urlPlayerId
                ? this.redirectToPlayerProfile()
                : true;
        }

        this.router.navigate([buildPath(`${RoutKey.Profiles}/${RoutKey.Create}`)]);
        return false;
    }

    private redirectToPlayerProfile(): boolean {
        this.router.navigate([`${RoutKey.Profiles}/${this.playerService.playerId.value}/${RoutKey.Edit}`]);
        return false;
    }
}