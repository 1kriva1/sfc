import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ILayoutModel } from './core/models/layout.model';

@Component({
  selector: 'sfc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private router: Router) { }

  layout: ILayoutModel = { header: false, footer: false };

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
