import { Injectable } from '@angular/core';
import { Theme } from 'ngx-sfc-common';
import { Observable, BehaviorSubject } from 'rxjs';
import { StorageService } from '@core/services/storage/storage.service';
import { CommonConstants } from '@core/constants';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private themeSubject: BehaviorSubject<Theme> =
        new BehaviorSubject<Theme>(this.storageService.get<Theme>(CommonConstants.THEME_KEY, Theme.Default) as Theme);

    public theme$: Observable<Theme> = this.themeSubject.asObservable();

    public get theme(): Theme {
        return this.themeSubject.value;
    }

    constructor(private storageService: StorageService) { }

    toggle(): void {
        const newTheme: Theme = this.theme === Theme.Default ? Theme.Dark : Theme.Default;
        this.storageService.set(CommonConstants.THEME_KEY, newTheme);
        this.themeSubject.next(newTheme);
    }
}