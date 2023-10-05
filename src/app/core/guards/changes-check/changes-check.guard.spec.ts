import { RouterStateSnapshot } from "@angular/router";
import { of } from "rxjs";
import { ChangesCheckGuard } from "./changes-check.guard";
import { ModalService } from "ngx-sfc-common";
import { IChangesCheck } from "./changes-check.model";
import { buildPath } from "@core/utils";
import { RoutKey } from "@core/enums";

describe('Core.Guard:ChangesCheck', () => {
    let modalSpy: jasmine.SpyObj<ModalService>;
    let guard: ChangesCheckGuard;

    beforeEach(() => {
        modalSpy = jasmine.createSpyObj<ModalService>('Modal', ['open', 'close']);
        guard = new ChangesCheckGuard(modalSpy);
    });

    fit('Should allow deactivate when not dirty', () => {
        const component: IChangesCheck = {
            guardChanges$: of({
                discardChanges: false,
                dirty: false
            })
        };

        const canDeactivate$ = guard.canDeactivate(component, null!, null!, {} as RouterStateSnapshot);

        canDeactivate$.subscribe((canDeactivate: boolean) => {
            expect(canDeactivate).toBeTrue()
            expect(modalSpy.open).not.toHaveBeenCalled();
            expect(modalSpy.close).not.toHaveBeenCalled();
        });
    });

    fit('Should allow deactivate when dirty, but can discardChanges', () => {
        const component: IChangesCheck = {
            guardChanges$: of({
                discardChanges: true,
                dirty: true
            })
        };

        const canDeactivate$ = guard.canDeactivate(component, null!, null!, {} as RouterStateSnapshot);

        canDeactivate$.subscribe((canDeactivate: boolean) => {
            expect(canDeactivate).toBeTrue()
            expect(modalSpy.open).not.toHaveBeenCalled();
            expect(modalSpy.close).toHaveBeenCalledTimes(1);
        });
    });

    fit('Should allow deactivate when dirty and can not discardChanges, but route is allowed to discard', () => {
        const component: IChangesCheck = {
            guardChanges$: of({
                discardChanges: false,
                dirty: true
            })
        };

        const canDeactivate$ = guard.canDeactivate(component, null!, null!,
            { url: buildPath(RoutKey.Welcome) } as RouterStateSnapshot);

        canDeactivate$.subscribe((canDeactivate: boolean) => {
            expect(canDeactivate).toBeTrue()
            expect(modalSpy.open).not.toHaveBeenCalled();
            expect(modalSpy.close).toHaveBeenCalledTimes(1);
        });
    });

    fit('Should not allow deactivate', () => {
        const component: IChangesCheck = {
            guardChanges$: of({
                discardChanges: false,
                dirty: true
            })
        };

        const canDeactivate$ = guard.canDeactivate(component, null!, null!,
            { url: buildPath(RoutKey.Home) } as RouterStateSnapshot);

        canDeactivate$.subscribe((canDeactivate: boolean) => {
            expect(canDeactivate).toBeFalse()
            expect(modalSpy.open).toHaveBeenCalledOnceWith(buildPath(RoutKey.Home));
            expect(modalSpy.close).not.toHaveBeenCalled();
        });
    });
});