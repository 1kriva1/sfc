import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { ThemeTogglerComponent } from './components/theme-toggler/theme-toggler.component';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    LogoComponent,
    ThemeTogglerComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxSfcCommonModule,
    NgxSfcComponentsModule
  ],
  exports: [
    LogoComponent,
    ThemeTogglerComponent
  ]
})
export class ShareModule { }
