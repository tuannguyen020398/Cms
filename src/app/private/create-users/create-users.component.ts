import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CreateUserModel } from 'src/app/model';
import { CommonService } from 'src/app/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {
  public object = new CreateUserModel;
  dataRegister: any = {};
  ValidateForm!: FormGroup;
  standalone!: boolean;
  errorsMessageDob!: string;
  check!: boolean;
  errorsMessageRequest!: any;
  successMessageRequest!:any;
  checkerror: boolean = true;
  ages!:number
 valuepass!: string;
  constructor(private route: Router, private _location: Location, private service: CommonService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    //check token login
    
  }
  //kiểm tra validate ngày sinh
  public functionDob=():any=>{
    var today = new Date();
    var birthDate = new Date(this.object.dob);
    this.ages= today.getFullYear() - birthDate.getFullYear();
    return this.ages
  }
  //đăng xuất
  logout() {
    if (localStorage.getItem('token') != null) {
      localStorage.removeItem('token')
      this.route.navigate(['login'])
    }
  }
  //quay lại trang trước
  goBack() {
    this._location.back();
  }
  //chuyển số điện thoại về đúng định dạng
  formatPhone(str: any) {
    let text = str.slice(0, 2);
    if (text === "84") {
      this.object.phoneNumber = "0" + str.slice(2)
      console.log('format', this.object.phoneNumber = "0" + str.slice(2))
    }
  }
  //gửi post thông tin người dùng
  createUser() {
    if ((this.ages<18&&this.ages>0)||(this.ages<0)||(this.ages>100)) {
      return
    }
    if (this.object.email === '') {
      this.object.email = null
    }
    this.service.postUser(this.object).subscribe(res => {
      this.dataRegister = res;
      if (this.dataRegister.isSuccessed) {
        this.successMessageRequest = 'Thêm mới thành công'
        setTimeout(() => {
          this.successMessageRequest = null;
          console.log('Thêm mới thành công');
          this.route.navigate(['main']);
        }, 800)
      } else {
        this.errorsMessageRequest = this.dataRegister.message
        setTimeout(() => {       
          this.errorsMessageRequest =null
        }, 1500) 
        console.log('fail', this.errorsMessageRequest)
        //alert('thêm mới thất bại : ' + this.errorsMessageRequest)
      }
    }, (err) => {
      this.checkerror = false
      this.errorsMessageDob = err.error.errors.Dob.toString();
      //alert(this.errorsMessageDob)
      setTimeout(() => {
        this.checkerror = true
      }, 1500)
      console.log(this.errorsMessageDob)
    })
  }

}
