import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileEditPageComponent } from './pages/edit/edit.page.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
    declarations: [
        ProfileEditPageComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule
    ],
    exports: []
})
export class ProfileModule { }
