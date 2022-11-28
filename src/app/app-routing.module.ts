import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login',loadChildren:()=>import('./public/public.module').then((m)=>m.PublicModule)},
  { path: 'main',loadChildren:()=>import('./private/private.module').then((m)=>m.PrivateModule)},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
