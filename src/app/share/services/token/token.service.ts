import { Injectable } from '@angular/core';
import { isDefined } from 'ngx-sfc-common';
import { IToken } from './token.model';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private readonly TOKEN_KEY = 'Token';

    get jwt(): any {
        const token: IToken | null = this.get();

        if (!token)
            return null;

        const jwtBase64 = token.Access!.split('.')[1];

        return JSON.parse(atob(jwtBase64));
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

    set(token: IToken): void {
        window.localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
    }

    get(): IToken | null {
        const tokenValue = window.localStorage.getItem(this.TOKEN_KEY);
        return tokenValue ? JSON.parse(tokenValue) : null;
    }

    remove(): void {
        window.localStorage.removeItem(this.TOKEN_KEY);
    }
}