import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { CommonService } from 'src/app/common.service';
import { ListById } from 'src/app/model';
import { FormBuilder,FormGroup, Validators,FormControl } from '@angular/forms';


@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  public id:any;
  public userByid=new ListById;
  dataRegister:any={}
  //ValidateForm!:FormGroup;
  submitted=false;
  errorsMessageDob!:string;
  // public List: { id: number; name: string; dob: Date;phoneNumber:string;email:string;gt:number } = {
  //   id: this.userByid.id,
  //   name: this.userByid.name,
  //   dob:this.userByid.dob,
  //   phoneNumber: this.userByid.phoneNumber,
  //   email:this.userByid.email,
  //   gt:this.userByid.gt
  // };
  constructor(private route:Router,private _location:Location,private activateroute: ActivatedRoute,private service: CommonService,private formbuilder:FormBuilder) { }
  //gọi ngay khi khoi tao 
  ngOnInit(): void {
    //const heroId = this.activateroute.snapshot.paramMap.get('id'); p1
    if(localStorage.getItem('token')==null){
      this.route.navigate(['login'])
    }
    this.activateroute.params.subscribe(params => {
      this.id = params['id'];
      console.log('iduser',this.id)
   });
   this.getRoute(this.id);

  }
  getRoute(id:any){
    this.service.getById(id).subscribe((res:any)=>{
      this.userByid = res;
      console.log("data",this.userByid);
      
    });    
  }
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
  
  format(number: Number): any {
    switch (number) {
      case 0:
        return "Nam";
      case 1:
        return "Nữ";
      case 2:
        return "Khác";
    }
  };
  onSubmit(obj:any){    
    obj.id=this.userByid.id
    console.log(obj)
    this.service.putUser(obj).subscribe(res=>{
      this.dataRegister=res
      if(this.dataRegister.isSuccessed){
        alert('cập nhật thành công')
        this.route.navigate(['main'])
      }else{
        alert('cập nhật thất bại')
      }      
    },(err)=>{
      this.errorsMessageDob=err.error.errors.Dob.toString();
      alert(this.errorsMessageDob)
      console.log(this.errorsMessageDob)
    })
  }
}
