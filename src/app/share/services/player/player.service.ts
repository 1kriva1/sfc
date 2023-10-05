import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isDefined, isNullOrEmptyString } from 'ngx-sfc-common';
import { filter, map, Observable } from 'rxjs';
import { StorageService } from '@core/services/storage/storage.service';
import { environment } from '@environments/environment';
import { PlayerServiceConstants } from './player.constants';
import { IGetPlayerByUserResponse, IPlayerByUserModel, IPlayerByUserProfileModel } from './models/get-player-by-user.response';
import { ObservableModel } from '@core/models/observable.model';
import { IdentityService } from '../identity/identity.service';
import { LOADER } from '@core/interceptors/loader/loader.interceptor';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public playerId: ObservableModel<number> = new ObservableModel();

  public player: ObservableModel<IPlayerByUserProfileModel> = new ObservableModel();

  public get playerCreated(): boolean { return isDefined(this.playerId.value); }

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private identityService: IdentityService) {
    this.identityService.userId$
      .pipe(filter((userId: string | null) => isNullOrEmptyString(userId)))
      .subscribe(() => this.storageService.remove(PlayerServiceConstants.PLAYER_ID_KEY))
  }

  public get(): Observable<IGetPlayerByUserResponse> {
    return this.http.get<IGetPlayerByUserResponse>(
      `${environment.players_url}${PlayerServiceConstants.URI_PART}/byuser`,
      { context: new HttpContext().set(LOADER, true) }
    ).pipe(
      map((response: IGetPlayerByUserResponse) => {
        this.update(response.Player);
        return response;
      })
    );
  }

  public update(player: IPlayerByUserModel): void {
    if (isDefined(player?.Id))
      this.storageService.set(PlayerServiceConstants.PLAYER_ID_KEY, player.Id);

    this.playerId.subject.next(player?.Id);
    this.player.subject.next(player?.Profile);
  }
}