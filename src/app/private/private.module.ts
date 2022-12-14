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
import {MatTableModule} from '@angular/material/table'
import {NgxPaginationModule} from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './users/modal/modal.component';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    BodyComponent,
    CreateUsersComponent,
    EditUsersComponent,
    ModalComponent
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
    MatCardModule,
    MatTableModule,
    NgxPaginationModule,
    NgbModule,
  ],
})
export class PrivateModule { }
