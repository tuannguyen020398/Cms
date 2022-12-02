import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { CreateUserModel } from 'src/app/model';
import { CommonService } from 'src/app/common.service';
import { FormBuilder,FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {
  public object=new CreateUserModel;
  dataRegister:any={};
  ValidateForm!:FormGroup;
  standalone!:boolean;
  errorsMessageDob!:string;
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
  constructor(private route:Router,private _location: Location,private service: CommonService,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')==null){
      this.route.navigate(['login'])
    }
    //this.validateForm();
  }
  
  // validateForm(){
  //   this.ValidateForm=this.formbuilder.group({
  //     id:[this.object.id],
  //     name:[this.object.name,[Validators.required,Validators.minLength(6)]],
  //     dob:[this.object.dob,Validators.required],
  //     gt:[this.object.gt,Validators.required],
  //     phoneNumber:[this.object.phoneNumber,Validators.required],
  //     email:[this.object.email,[Validators.required,Validators.email]],
  //     passwordHash:[this.object.passwordHash,[Validators.required,Validators.minLength(6)]],
  //     userName:[this.object.userName],
  //     Passwordagain:['',Validators.required]
  //   })
  // }
  logout(){
    if(localStorage.getItem('token')!=null)
    {
      localStorage.removeItem('token')
      this.route.navigate(['login'])
    } 
  }
  goBack(){
    this._location.back();
  }
  createUser(){
    console.log('obj',this.object)
      this.service.postUser(this.object).subscribe(res=>{
        this.dataRegister=res;
        if(this.dataRegister.isSuccessed){
          alert('thêm mới thành công')
          this.route.navigate(['main'])
        }else{
          alert('thêm mới thất bại')
        }       
      },(err)=>{
        this.errorsMessageDob=err.error.errors.Dob.toString();
        alert(this.errorsMessageDob)
        console.log(this.errorsMessageDob)
      })

  }

}
