import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { MainComponent } from './users/main/main.component';
import { HeaderComponent } from './users/header/header.component';
import { BodyComponent } from './users/body/body.component';
//import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CreateUsersComponent } from './create-users/create-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    BodyComponent,
    CreateUsersComponent,
    EditUsersComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //MatSelectModule
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule
  ]
})
export class PrivateModule { }
