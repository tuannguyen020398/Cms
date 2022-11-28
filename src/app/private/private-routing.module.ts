import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUsersComponent } from './create-users/create-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { MainComponent } from './users/main/main.component';

const routes: Routes = [{ path: '', component: MainComponent},
{ path: 'main/create', component: CreateUsersComponent},
{ path: 'main/edit', component: EditUsersComponent}];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
