import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { LOADER } from '@core/interceptors/loader/loader.interceptor';
import { DataServiceConstants } from './data.constants';
import { IGetDataResponse } from './models/get-data.response';
import { CACHE } from '@core/interceptors/cache/cache.interceptor';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  public get(): Observable<IGetDataResponse> {
    return this.http.get<IGetDataResponse>(
      `${environment.data_url}${DataServiceConstants.URI_PART}`,
      { context: new HttpContext().set(LOADER, true).set(CACHE, true) }
    );
  }
}