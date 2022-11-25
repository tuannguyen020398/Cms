import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsermainComponent } from './usermain/usermain.component';
import { HeaderUserComponent } from './usermain/header-user/header-user.component';
import { BodyUserComponent } from './usermain/body-user/body-user.component';


@NgModule({
  declarations: [
    UsermainComponent,
    HeaderUserComponent,
    BodyUserComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    UsermainComponent
  ]
})
export class PrivateModule { }
