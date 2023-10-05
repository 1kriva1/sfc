import { Component, HostBinding, Input } from '@angular/core';
import { Direction, Theme, UIClass } from 'ngx-sfc-common';
import { IdentityService } from '@share/services/identity/identity.service';
import { HeaderService } from '../../services/header.service';
import { IHeaderNavigationModel } from './header-navigation.model';

@Component({
  selector: 'sfc-base-header',
  templateUrl: './base-header.component.html',
  styleUrls: ['./base-header.component.scss']
})
export class BaseHeaderComponent {

  Direction = Direction;

  @Input()
  navigations: IHeaderNavigationModel[] = [];

  @HostBinding(`class.${UIClass.Open}`)
  @HostBinding(`class.${Theme.Dark}`)
  public get open(): boolean { return this.headerService.open; }

  constructor(
    public headerService: HeaderService,
    public identityService: IdentityService) { }
}