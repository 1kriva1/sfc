import { Injectable } from '@angular/core';
import { isDefined } from 'ngx-sfc-common';
import { StorageService } from '@core/services/storage/storage.service';
import { IToken } from './token.model';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private readonly TOKEN_KEY = 'token';

    get jwt(): any {
        const token: IToken | null = this.get();

        if (!token)
            return null;

        const jwtBase64 = token.Access!.split('.')[1];

        try {
            return JSON.parse(atob(jwtBase64));
        } catch (error) {
            return null;
        }
    }

    get expired(): number | null {
        if (!this.exist)
            return null;

        return this.jwt.exp * 1000;
    }

    get expiredDate(): Date | null {
        if (!this.exist)
            return null;

        return new Date(this.expired as number);
    }

    get isExpired(): boolean {
        if (!this.exist)
            return false;

        return Date.now() >= (this.expired as number);
    }

    get exist(): boolean {
        return isDefined(this.jwt);
    }

    get invalid(): boolean {
        return this.exist && this.isExpired;
    }

    get valid(): boolean {
        return this.exist && !this.isExpired;
    }

    constructor(private storageService: StorageService) { }

    set(token: IToken): void {
        this.storageService.set(this.TOKEN_KEY, JSON.stringify(token));
    }

    get(): IToken | null {
        const tokenValue = this.storageService.get<string>(this.TOKEN_KEY);
        return tokenValue ? JSON.parse(tokenValue) : null;
    }

    remove(): void {
        this.storageService.remove(this.TOKEN_KEY);
    }
}