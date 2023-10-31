import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import {
  DataModule,
  I18nModule,
  PlayerModule, TokenRefreshModule
} from '@core/initializers';
import { HttpInterceptorProviders } from '@core/interceptors';
import { HomeModule } from './features/home/home.module';
import { WelcomeModule } from './features/welcome/welcome.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgxSfcCommonModule,
    NgxSfcComponentsModule,
    CoreModule,
    WelcomeModule,
    HomeModule,
    AppRoutingModule
  ],
  providers: [
    I18nModule.setLocale(),
    I18nModule.setLocaleId(),
    DataModule.init(),
    TokenRefreshModule.init(),
    PlayerModule.init(),
    HttpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
