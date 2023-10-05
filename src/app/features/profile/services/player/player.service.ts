import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { map, Observable } from 'rxjs';
import { LOADER } from '@core/interceptors/loader/loader.interceptor';
import { environment } from '@environments/environment';
import { ICreatePlayerRequest } from './models/create/create.request';
import { ICreatePlayerResponse } from './models/create/create.response';
import { IGetPlayerResponse } from './models/get/get.response';
import { IUpdatePlayerRequest } from './models/update/update.request';
import { IUpdatePlayerResponse } from './models/update/update.response';
import { PlayerServiceConstants } from './player.constants';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    constructor(private http: HttpClient) { }

    public create(request: ICreatePlayerRequest): Observable<ICreatePlayerResponse> {
        return this.http.post<ICreatePlayerResponse>(
            `${environment.players_url}${PlayerServiceConstants.URI_PART}`,
            request,
            { context: new HttpContext().set(LOADER, true) }
        );
    }

    public update(id: number, request: IUpdatePlayerRequest): Observable<IUpdatePlayerResponse> {
        return this.http.put<IUpdatePlayerResponse | null>(
            `${environment.players_url}${PlayerServiceConstants.URI_PART}/${id}`,
            request,
            { context: new HttpContext().set(LOADER, true) }
        ).pipe(
            map((response: IUpdatePlayerResponse | null) => response
                || { Success: true, Errors: null, Message: CommonConstants.EMPTY_STRING })
        )
    }

    public get(id: number): Observable<IGetPlayerResponse> {
        return this.http.get<IGetPlayerResponse>(
            `${environment.players_url}${PlayerServiceConstants.URI_PART}/${id}`,
            { context: new HttpContext().set(LOADER, true) }
        );
    }
}