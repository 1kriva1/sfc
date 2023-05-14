import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { I18nModule } from './core/i18n/i18n.module';
import { TokenRefreshModule } from './core/Identity/token-refresh/token-refresh.module';
import { HttpInterceptorProviders } from './core/interceptors';
import { HomeModule } from './features/home/home.module';
import { ProfileModule } from './features/profile/profile.module';
import { WelcomeModule } from './features/welcome/welcome.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSfcCommonModule,
    NgxSfcComponentsModule,
    CoreModule,
    WelcomeModule,
    HomeModule,
    AppRoutingModule,
    ProfileModule
  ],
  providers: [
    I18nModule.setLocale(),
    I18nModule.setLocaleId(),
    TokenRefreshModule.init(),
    HttpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
