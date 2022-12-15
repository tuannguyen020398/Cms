import { Component, OnInit,Input,ViewChild,Output,EventEmitter } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { CreateUserModel } from 'src/app/model';
import { CommonService } from 'src/app/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListById } from 'src/app/model';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

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
  @Input()id!:any;//lay id tu component body
  @Input()objedit!:any;// lay obj get by id
  public userByid = new ListById;
  //ValidateForm!:FormGroup;
  submitted = false;
  //check!: boolean;
  checkdate: boolean = true;
  dobText!: string;
  checkdob!: boolean;
  idParams!:number;
  @ViewChild('closebutton') closebutton:any;//close modal
  @Output() getData = new EventEmitter<string>();
  constructor(private route: Router, private _location: Location, private service: CommonService, private formbuilder: FormBuilder,private activateroute: ActivatedRoute) { }
  ngOnChanges() {
    //lấy id
    this.idParams=this.id
    console.log('idParams',this.idParams)
    console.log('objedit',this.objedit)
    this.userByid=this.objedit
  }
  ngOnInit(): void {
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
          this.reload()
          //this.route.navigate(['main']);
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
          //this.reload()
          this.getData.emit();
          this.closebutton.nativeElement.click();
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
  //reload
  reload(){
    location.reload()
    this.closebutton.nativeElement.click();
  }

}
