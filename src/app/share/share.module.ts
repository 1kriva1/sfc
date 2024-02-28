import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import {
  IconTooltipComponent,
  LogoComponent,
  ThemeTogglerComponent,
  TitleComponent,
  InfoPanelComponent,
  PlayerInfoPanelComponent,
  NoDataComponent
} from './components';

@NgModule({
  declarations: [
    LogoComponent,
    ThemeTogglerComponent,
    IconTooltipComponent,
    TitleComponent,
    InfoPanelComponent,
    PlayerInfoPanelComponent,
    NoDataComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSfcCommonModule,
    NgxSfcComponentsModule
  ],
  exports: [
    LogoComponent,
    ThemeTogglerComponent,
    IconTooltipComponent,
    TitleComponent,
    InfoPanelComponent,
    PlayerInfoPanelComponent,
    NoDataComponent
  ]
})
export class ShareModule { }
