import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { VerifyComponent } from './user/verify/verify.component';

const routes: Routes = [
  {
    path: '',
    component: ForumComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: 'verify/:token',
    component: VerifyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
