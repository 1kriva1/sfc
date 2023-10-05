import { Injectable } from '@angular/core';
import { Router, CanMatch } from '@angular/router';
import { Observable } from 'rxjs';
import { RoutKey } from '@core/enums';
import { PlayerService } from '@share/services/player/player.service';

@Injectable({ providedIn: 'root' })
export class CanMatchOnlyNewProfile implements CanMatch {

    constructor(private playerService: PlayerService, private router: Router) { }

    canMatch(): Observable<boolean> | boolean {
        if (this.playerService.playerCreated) {
            this.router.navigate([`${RoutKey.Profiles}/${this.playerService.playerId.value}/${RoutKey.Edit}`]);
            return false;
        }

        return true;
    }
}