import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CACHE } from '@core/interceptors/cache/cache.interceptor';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { IExistenceResponse } from './existence.response';

@Injectable({
  providedIn: 'any'
})
export class ExistenceService {

  private readonly EXISTENCE_URI_PART = '/api/existence';

  constructor(private http: HttpClient) { }

  existByUserName(username: string): Observable<IExistenceResponse> {
    return this.http.get<IExistenceResponse>(
      `${environment.identity_url}${this.EXISTENCE_URI_PART}/name/${username}`,
      { context: new HttpContext().set(CACHE, true) }
    );
  }

  existByEmail(email: string): Observable<IExistenceResponse> {
    return this.http.get<IExistenceResponse>(
      `${environment.identity_url}${this.EXISTENCE_URI_PART}/email/${email}`,
      { context: new HttpContext().set(CACHE, true) }
    );
  }
}
