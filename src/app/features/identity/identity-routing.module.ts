import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutKey } from '@core/enums';
import { LoginPageComponent, RegistrationPageComponent } from './pages';

const routes: Routes = [
  {
    path: RoutKey.Registration,
    component: RegistrationPageComponent
  },
  {
    path: RoutKey.Login,
    component: LoginPageComponent
  },
  {
    path: '',
    redirectTo: RoutKey.Registration,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentityRoutingModule { }
