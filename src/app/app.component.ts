import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { isDefined, nameof, Theme } from 'ngx-sfc-common';
import { INotificationAutoCloseModel } from 'ngx-sfc-components';
import { Subscription, switchMap, filter } from 'rxjs';
import { IRouteDataModel } from '@core/models/route-data.model';
import { ILayoutModel } from '@core/models/layout.model';
import { NotificationService } from '@core/services/notification/notification.service';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';
import { AppComponentConstants } from './app.component.constants';
import { EnumService, IdentityService, PlayerService } from '@share/services';
import { StorageService } from '@core/services';
import { PlayerServiceConstants } from '@share/services/player/player.constants';
import { Process } from '@core/enums';

@Component({
  selector: 'sfc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public layout: ILayoutModel = { header: false, footer: false };

  @HostBinding('class')
  public get theme(): Theme | null { return this.themeEnabled ? this.themeService.theme : null; }

  public notificationAutoCloseModel: INotificationAutoCloseModel = {
    enabled: true,
    interval: AppComponentConstants.NOTIFICATION_AUTO_CLOSE_INTERVAL
  };

  private themeEnabled: boolean = true;

  private _layoutSubscription!: Subscription;

  private _loginSubscription!: Subscription;

  private _logoutSubscription!: Subscription;

  private _registrationSubscription!: Subscription;

  constructor(
    public notificationService: NotificationService,
    private enumService: EnumService,
    private identityService: IdentityService,
    private playerService: PlayerService,
    private storageService: StorageService,
    private themeService: ThemeService,
    private router: Router) { }

  ngOnInit(): void {
    this._layoutSubscription = this.router.events.subscribe(data => {
      if (data instanceof ActivationStart) {
        const dataValue: IRouteDataModel = data.snapshot.data as IRouteDataModel,
          themEnabledValue = dataValue[nameof<IRouteDataModel>('themeEnabled')];

        this.layout = dataValue[nameof<IRouteDataModel>('layout')] as ILayoutModel;
        this.themeEnabled = isDefined(themEnabledValue) ? themEnabledValue as boolean : true;
      }
    });

    // logout
    this._logoutSubscription = this.identityService.userId.value$.pipe(
      filter(model => model.process != Process.Init
        && !this.identityService.isLoggedIn)
    ).subscribe(() => {
      this.playerService.update(null);
      this.storageService.remove(PlayerServiceConstants.PLAYER_ID_KEY);
    });

    // login
    this._loginSubscription = this.identityService.userId.value$.pipe(
      filter(model => model.process == Process.Login
        && this.identityService.isLoggedIn),
      switchMap(() => this.enumService.load()),
      switchMap(() => this.playerService.get())
    ).subscribe();

    // registration
    this._registrationSubscription = this.identityService.userId.value$.pipe(
      filter(model => model.process == Process.Registration
        && this.identityService.isLoggedIn),
      switchMap(() => this.enumService.load())
    ).subscribe();
  }

  ngOnDestroy(): void {
    this._layoutSubscription.unsubscribe();
    this._loginSubscription.unsubscribe();
    this._logoutSubscription.unsubscribe();
    this._registrationSubscription.unsubscribe();
  }
}
