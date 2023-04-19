import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { INotificationAutoCloseModel } from 'ngx-sfc-components';
import { Subscription } from 'rxjs';
import { ILayoutModel } from './core/models/layout.model';
import { NotificationService } from './core/services/notification/notification.service';

@Component({
  selector: 'sfc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private router: Router, public notificationService: NotificationService) { }

  public layout: ILayoutModel = { header: false, footer: false };

  public notificationAutoCloseModel: INotificationAutoCloseModel = { enabled: true, interval: 3000 };

  private _layoutSubscription!: Subscription;

  ngOnInit() {
    this._layoutSubscription = this.router.events.subscribe(data => {
      if (data instanceof ActivationStart)
        this.layout = data.snapshot.data as ILayoutModel;
    });
  }

  ngOnDestroy(): void {
    this._layoutSubscription.unsubscribe();
  }
}
