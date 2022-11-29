import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { CommonService } from 'src/app/common.service';
import { ListById } from 'src/app/model';


@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  public id:any;
  public userByid=new ListById;
  dataRegister:any={}
  // public List: { id: number; name: string; dob: string;phoneNumber:string;email:string;gt:number } = {
  //   id: 0,
  //   name: "",
  //   dob:"",
  //   phoneNumber: "",
  //   email:"",
  //   gt:0
  // };
  constructor(private route:Router,private _location:Location,private activateroute: ActivatedRoute,private service: CommonService) { }

  ngOnInit(): void {
    //const heroId = this.activateroute.snapshot.paramMap.get('id'); p1
    this.activateroute.params.subscribe(params => {
      this.id = params['id'];
      console.log('iduser',this.id)
   });
   this.getRoute(this.id)
  }
  logout(){
    this.route.navigate(['login'])
  }
  goBack(){
    this._location.back();
  }
  getRoute(id:any){
    this.service.getById(id).subscribe((res:any)=>{
      this.userByid = res;
      console.log("data",this.userByid);
    });    
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
  editUser(){
    console.log(this.userByid)
    this.service.putUser(this.userByid).subscribe(res=>{
      this.dataRegister=res
      if(this.dataRegister.isSuccessed){
        alert('cập nhật thành công')
        this.route.navigate(['main'])
      }else{
        alert('cập nhật thất bại')
      }
      
    })
    
  }
}
