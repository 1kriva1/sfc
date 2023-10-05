import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityRoutingModule } from './identity-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSfcInputsModule } from 'ngx-sfc-inputs';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { ShareModule } from '@share/share.module';
import { LoginPageComponent, RegistrationPageComponent } from './pages';

@NgModule({
  declarations: [
    RegistrationPageComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSfcCommonModule,
    NgxSfcComponentsModule,
    NgxSfcInputsModule,    
    ShareModule,    
    IdentityRoutingModule
  ],
  exports: []
})
export class IdentityModule { }
