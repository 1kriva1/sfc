import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutConstants } from '@core/constants/layout.constants';
import { RoutKey } from '@core/enums';
import { CanMatchOnlyAnonymous, CanMatchAuthorized } from '@core/guards';
import { NotFoundPageComponent } from '@core/pages/not-found/not-found.page.component';
import { buildPath } from '@core/utils';
import { HomePageComponent } from './features/home/pages/home/home.page.component';
import { WelcomePageComponent } from './features/welcome/pages';

const routes: Routes = [
  {
    path: RoutKey.Welcome,
    component: WelcomePageComponent,
    data: { layout: LayoutConstants.FULL_LAYOUT_MODEL, themeEnabled: false },
    canMatch: [CanMatchOnlyAnonymous]
  },
  {
    path: RoutKey.Home,
    component: HomePageComponent,
    data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
    canMatch: [CanMatchAuthorized]
  },
  {
    path: RoutKey.Identity,
    loadChildren: () => import('./features/identity/identity.module').then(m => m.IdentityModule),
    data: { layout: LayoutConstants.ONLY_CONTENT_LAYOUT_MODEL, themeEnabled: false },
    canMatch: [CanMatchOnlyAnonymous]
  },
  {
    path: RoutKey.Profiles,
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
    data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
    canMatch: [CanMatchAuthorized]
  },
  { path: '', redirectTo: buildPath(RoutKey.Welcome), pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent, data: { layout: LayoutConstants.ONLY_CONTENT_LAYOUT_MODEL, themeEnabled: false } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    scrollOffset: [0, 64]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
