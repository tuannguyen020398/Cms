import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponentComponent } from './PageNotFound/page-not-found-component/page-not-found-component.component';
import { CreateUsersComponent } from './private/create-users/create-users.component';
import { EditUsersComponent } from './private/edit-users/edit-users.component';
import {  AuthService as AuthGuard } from './canActiveRoute/auth.service';
import {AuthloginService as AuthGuardLogin} from './canActiveRoute/auth-login.service';
import { AuthCreateService as AuthGuardCreate} from './canActiveRoute/auth-create.service';
import { AuthEditService as AuthGuardedit} from './canActiveRoute/auth-edit.service';

//router cho module và component # module
const routes: Routes = [
  { path: 'login', loadChildren: () => import('./public/public.module').then((m) => m.PublicModule),canActivate:[AuthGuardLogin]},
  { path: 'main', loadChildren: () => import('./private/private.module').then((m) => m.PrivateModule),canActivate:[AuthGuard]},
  //{ path: 'main/create', component: CreateUsersComponent ,canActivate:[AuthGuardCreate]},
 // { path: 'main/edit/:id', component: EditUsersComponent ,canActivate:[AuthGuardedit]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponentComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
