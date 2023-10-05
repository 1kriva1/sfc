import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { ThemeTogglerComponent } from './components/theme-toggler/theme-toggler.component';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconTooltipComponent } from './components/icon-tooltip/icon-tooltip.component';
import { TitleComponent } from './components/title/title.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LogoComponent,
    ThemeTogglerComponent,
    IconTooltipComponent,
    TitleComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSfcCommonModule
  ],
  exports: [
    LogoComponent,
    ThemeTogglerComponent,
    IconTooltipComponent,
    TitleComponent
  ]
})
export class ShareModule { }
