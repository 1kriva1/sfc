import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { PlayerServiceConstants } from './player.constants';
import { IGetPlayersRequest } from './models/get/get-players.request';
import { IGetPlayersResponse } from './models/get/get-players.response';
import { buildHttpParams } from 'ngx-sfc-common';
import { LOADER } from '@core/interceptors/loader/loader.interceptor';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    constructor(private http: HttpClient) { }

    public get(request: IGetPlayersRequest, loader: boolean = true): Observable<HttpResponse<IGetPlayersResponse>> {
        return this.http.get<IGetPlayersResponse>(
            `${environment.players_url}${PlayerServiceConstants.URI_PART}/byfilters`,
            {
                context: new HttpContext().set(LOADER, loader),
                params: buildHttpParams(request),
                observe: 'response'
            }
        )
    }
}