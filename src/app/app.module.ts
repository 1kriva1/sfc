import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { I18nModule } from './core/i18n/i18n.module';
import { HomeModule } from './features/home/home.module';
import { WelcomeModule } from './features/welcome/welcome.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule, 
    BrowserAnimationsModule,
    CoreModule,
    WelcomeModule,
    HomeModule,
    AppRoutingModule
  ],
  providers: [I18nModule.setLocale(), I18nModule.setLocaleId()],
  bootstrap: [AppComponent]
})
export class AppModule { }
