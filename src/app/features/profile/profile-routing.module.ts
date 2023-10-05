import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutKey } from '@core/enums';
import { ChangesCheckGuard } from '@core/guards';
import { ProfileEditPageComponent } from './pages/edit/edit.page.component';
import { EditPageLocalization } from './pages/edit/edit.page.localization';
import { ProfileResolver } from './resolvers/profile.resolver';
import { CanMatchOnlyNewProfile, CanActivateOnlyUserProfile } from './guards';
import { buildTitle } from '@core/utils';

const routes: Routes = [
  {
    path: RoutKey.Create,
    component: ProfileEditPageComponent,
    title: buildTitle(EditPageLocalization.ROUTER.TITLE.CREATE),
    canMatch: [CanMatchOnlyNewProfile]
  },
  {
    path: `:id/${RoutKey.Edit}`,
    component: ProfileEditPageComponent,
    resolve: { profile: ProfileResolver },
    canActivate: [CanActivateOnlyUserProfile],
    canDeactivate: [ChangesCheckGuard]
  },
  {
    path: '',
    redirectTo: RoutKey.Create,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
