import { Observable } from "rxjs";

export interface IChangesCheckGuardModel {
  discardChanges: boolean;
  dirty: boolean;
}

export interface IChangesCheck {
  guardChanges$: Observable<IChangesCheckGuardModel>;
}