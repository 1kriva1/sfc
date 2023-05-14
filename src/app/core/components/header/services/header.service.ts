import { Inject, Injectable } from '@angular/core';
import { DOCUMENT, UIConstants } from 'ngx-sfc-common';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    public height$!: Observable<number>;

    public get open(): boolean { return this.openSubject.value; }

    private openSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public open$: Observable<boolean> = this.openSubject.asObservable()
        .pipe(
            tap(value => this.document.body.style.overflow = value
                ? UIConstants.CSS_VISIBILITY_HIDDEN
                : UIConstants.CSS_INITIAL)
        );

    constructor(@Inject(DOCUMENT) private document: Document) { }

    toggle(): void {
        this.openSubject.next(!this.open);
    }

    toggleByValue(value: boolean): void {
        this.openSubject.next(value);
    }
}
