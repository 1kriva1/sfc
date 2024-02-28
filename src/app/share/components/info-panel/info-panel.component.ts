import { Component, Input } from '@angular/core';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants } from 'ngx-sfc-common';
import { IInfoPanelModel } from './info-panel.model';

@Component({
  selector: 'sfc-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent {

  @Input()
  model: IInfoPanelModel = {
    background: '#fff',
    description: CommonConstants.EMPTY_STRING,
    icon: faInfo,
    iconBackground: '#e6e6e6',
    title: CommonConstants.EMPTY_STRING
  };
}
