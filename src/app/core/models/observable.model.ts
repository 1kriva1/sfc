import { BehaviorSubject, Observable } from "rxjs";

export class ObservableModel<T>{
    public subject: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(null);

    public value$: Observable<T | null> = this.subject.asObservable();

    public get value(): T | null { return this.subject.value; }
}