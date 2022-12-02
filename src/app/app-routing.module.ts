import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponentComponent } from './PageNotFound/page-not-found-component/page-not-found-component.component';
import { CreateUsersComponent } from './private/create-users/create-users.component';
import { EditUsersComponent } from './private/edit-users/edit-users.component';


//router cho module và component # module
const routes: Routes = [
  { path: 'login', loadChildren: () => import('./public/public.module').then((m) => m.PublicModule) },
  { path: 'main', loadChildren: () => import('./private/private.module').then((m) => m.PrivateModule) },
  { path: 'main/create', component: CreateUsersComponent },
  { path: 'main/edit/:id', component: EditUsersComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponentComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
