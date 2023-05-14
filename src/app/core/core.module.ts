import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  HeaderComponent,
  BaseHeaderComponent,
  WelcomeHeaderComponent,
  AuthenticatedHeaderComponent,
  LanguageTogglerComponent,
  FooterComponent
} from './components';
import { NotFoundPageComponent, CanvasBallDirective } from './pages';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [
    WelcomeHeaderComponent,
    BaseHeaderComponent,
    LanguageTogglerComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    CanvasBallDirective,
    AuthenticatedHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    NgxSfcCommonModule,
    NgxSfcComponentsModule,
    ShareModule
  ],
  exports: [
    HeaderComponent,
    WelcomeHeaderComponent,
    AuthenticatedHeaderComponent,
    FooterComponent,
    NotFoundPageComponent
  ]
})
export class CoreModule { }
