import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { isDefined, nameof, Theme } from 'ngx-sfc-common';
import { INotificationAutoCloseModel } from 'ngx-sfc-components';
import { Subscription } from 'rxjs';
import { IRouteDataModel } from './core/models/route-data.model';
import { ILayoutModel } from './core/models/layout.model';
import { NotificationService } from './core/services/notification/notification.service';
import { ThemeService } from './share/components/theme-toggler/services/theme/theme.service';

@Component({
  selector: 'sfc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public layout: ILayoutModel = { header: false, footer: false };

  @HostBinding('class')
  public get theme(): Theme | null { return this.themeEnabled ? this.themeService.theme : null; }

  public notificationAutoCloseModel: INotificationAutoCloseModel = { enabled: true, interval: 3000 };

  private themeEnabled: boolean = true;

  private _layoutSubscription!: Subscription;

  constructor(public notificationService: NotificationService,
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
  }

  ngOnDestroy(): void {
    this._layoutSubscription.unsubscribe();
  }
}
