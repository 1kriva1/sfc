import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutConstants } from './core/constants/layout.constants';
import { RoutKey } from './core/enums';
import { CanMatchOnlyAnonymous } from './core/guards/only-anonymous/only-anonymous.guard';
import { CanMatchAuthorized } from './core/guards/authentication/authentication.guard';
import { NotFoundPageComponent } from './core/pages/not-found/not-found.page.component';
import { buildPath } from './core/utils';
import { HomePageComponent } from './features/home/pages/home/home.page.component';
import { WelcomePageComponent } from './features/welcome/pages';

const routes: Routes = [
  { path: RoutKey.Welcome, component: WelcomePageComponent, data: LayoutConstants.FULL_LAYOUT_MODEL, canMatch: [CanMatchOnlyAnonymous] },
  { path: RoutKey.Home, component: HomePageComponent, data: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL, canMatch: [CanMatchAuthorized] },
  {
    path: RoutKey.Identity, loadChildren: () => import('./features/identity/identity.module').then(m => m.IdentityModule),
    data: LayoutConstants.ONLY_CONTENT_LAYOUT_MODEL, canMatch: [CanMatchOnlyAnonymous]
  },
  { path: '', redirectTo: buildPath(RoutKey.Welcome), pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent, data: LayoutConstants.ONLY_CONTENT_LAYOUT_MODEL }
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
