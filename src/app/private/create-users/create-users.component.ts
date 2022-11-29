import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { CreateUserModel } from 'src/app/model';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {
  public object=new CreateUserModel;
  dataRegister:any={}
  // public object: { id: number; name: string; dob: string;phoneNumber:string;email:string;gt:number,passwordHash:string } = {
  //   id: 0,
  //   name: "",
  //   dob:"",
  //   phoneNumber: "",
  //   email:"",
  //   gt:0,
  //   passwordHash:"",
  // };
  public valuepass!:string;
  constructor(private route:Router,private _location: Location,private service: CommonService) { }

  ngOnInit(): void {
  }
  logout(){
    this.route.navigate(['login'])
  }
  goBack(){
    this._location.back();
  }
  createUser(){
    if(this.valuepass===this.object.passwordHash){
      console.log('data',this.object)
      this.service.postUser(this.object).subscribe(res=>{
        this.dataRegister=res;
        if(this.dataRegister.isSuccessed){
          alert('thêm mới thành công')
          this.route.navigate(['main'])
        }else{
          alert('thêm mới thất bại')
        }       
      })
    }else{
      alert('Mật khẩu không giống nhau')
    }
  }
}
