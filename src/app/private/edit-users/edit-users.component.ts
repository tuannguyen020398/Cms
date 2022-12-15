import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/common.service';
import { ListById } from 'src/app/model';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  public id: any;
  public userByid = new ListById;
  dataRegister: any = {}
  //ValidateForm!:FormGroup;
  submitted = false;
  errorsMessageDob!: string;
  //check!: boolean;
  errorsMessageRequest!: any;
  successMessageRequest!:any;
  checkerror: boolean = true;
  checkdate: boolean = true;
  dobText!: string;
  checkdob!: boolean;
  ages!:number;
  constructor(private route: Router, private _location: Location, private activateroute: ActivatedRoute, private service: CommonService, private formbuilder: FormBuilder) { }

  //gọi ngay khi khoi tao 
  ngOnInit(): void {
    //const heroId = this.activateroute.snapshot.paramMap.get('id'); p1
    //check token login
    
    //lấy id
    this.activateroute.params.subscribe(params => {
      this.id = params['id'];
      console.log('iduser', this.id)
    });
    this.getRoute(this.id);
  }
  //lấy người dùng theo id
  getRoute(id: any) {
    this.service.getById(id).subscribe((res: any) => {
      this.userByid = res;
      console.log("data", this.userByid);
    });
  }
  // đăng xuất
  logout() {
    if (localStorage.getItem('token') != null) {
      localStorage.removeItem('token')
      this.route.navigate(['login'])
    }
  }
  // quay lại trang
  goBacks() {
    this._location.back();
  }
  //chuyển số điện thoại về đúng định dạng
  formatPhone(str: any) {
    let text = str.slice(0, 2);
    if (text === "84") {
      this.userByid.phoneNumber = "0" + str.slice(2)
      console.log('format', this.userByid.phoneNumber = "0" + str.slice(2))
    }
  }

  // public functionAge = (): boolean => {
  //   var today = new Date();
  //   var birthDate = new Date(this.userByid.dob);
  //   var age = today.getFullYear() - birthDate.getFullYear();
  //   console.log('today', today)
  //   console.log('birthDate', birthDate)
  //   console.log('age', age)
  //   if (age >= 18) {
  //     console.log('year')
  //     return this.check = true
  //   } else {
  //     console.log('<18')
  //     return this.check = false
  //   }
  // };
  //kiểm tra validate ngày sinh
  public functionDob=():any=>{
    var today = new Date();
    var birthDate = new Date(this.userByid.dob);
    this.ages= today.getFullYear() - birthDate.getFullYear();
    return this.ages
  }
  // gửi put request thông tin người dùng
  editUser(obj: any) {
    if ((this.ages<18&&this.ages>0)||(this.ages<0)||(this.ages>100)) {
      return
    }
    if (obj.email === '') {
      obj.email = null
    }
    obj.id = this.userByid.id;
    obj.dateCreated=this.userByid.dateCreated;
    obj.lastUpdate=new Date();
    obj.status=this.userByid.status;
    console.log(obj);
    this.service.putUser(obj).subscribe(res => {
      this.dataRegister = res
      if (this.dataRegister.isSuccessed == true) {
        this.successMessageRequest = 'Cập nhật thành công'
        setTimeout(() => {
          this.successMessageRequest = null;
          console.log('cập nhật thành công',this.dataRegister);
          this.route.navigate(['main']);
        }, 1000)
      } else {
        this.errorsMessageRequest = this.dataRegister.message
        setTimeout(() => {
          this.errorsMessageRequest = null
        }, 1500)
        console.log('fail', this.errorsMessageRequest)
        //alert('thêm mới thất bại : ' + this.errorsMessageRequest)       
      }
    }, (err) => {
      this.checkerror = false
      this.errorsMessageDob = err.error.errors.Dob.toString();
      setTimeout(() => {
        this.checkerror = true
      }, 1500)
      //alert(this.errorsMessageDob)
      //console.log(this.errorsMessageDob)
      
    })
  }
}
