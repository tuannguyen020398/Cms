import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { Filter } from 'src/app/model';
import { format } from 'src/app/common';
import { ListById } from 'src/app/model';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  // public selectArray: Array<{ id: number, text: string,selected:boolean }> = [
  //   { id: 0, text: 'Nam',selected:true },
  //   { id: 1, text: 'Nữ',selected:false },
  //   { id: 2, text: 'Khác',selected:false },
  // ];
  constructor(private service: CommonService, private router: Router) { }
  p: number = 1;
  //size:number=5;
  dataRegister: any = {}
  object: any = {}
  listUser: any = [];
  public obj = new Filter;
  check!: boolean;
  checkdate!: boolean;
  checkDateEnd!: boolean;
  textKeyWork?: string = '';
  yearDateStart!: number;
  yearDateEnd!: number;
  yearBool!: boolean;
  id:number=0
  public objedit:any={};

  public fm = format;
  ngOnInit(): void {
    this.getUsers();
    console.log(localStorage.getItem('token'));
    
  }
  //lấy người dùng theo id
  getRoute(id: any) {
    this.service.getById(id).subscribe((res: any) => {
      this.objedit = res;
      console.log("data", this.objedit);
    });
  }
  //kiểm tra ngày tạo
  public functionAge = (): boolean => {
    var birthDateStart = new Date(this.obj.StartDob);
    this.yearDateStart = birthDateStart.getFullYear();
    console.log('birthDateEnd', birthDateStart.getTime())
    var today = new Date();
    this.functionYear();
    var ageYear = today.getFullYear() - birthDateStart.getFullYear();
    if ((ageYear >= 0) || !(birthDateStart.getFullYear())) {
      console.log('year')
      return this.checkdate = true
    }
    else {
      console.log('ko hop le')
      return this.checkdate = false
    }
  };
  // kiểm tra ngày kết thúc
  public functionAgeEnd = (): boolean => {
    var today = new Date();
    var birthDateEnd = new Date(today);
    console.log('birthDateEnd', birthDateEnd.getTime())
    this.yearDateEnd = birthDateEnd.getFullYear();
    var ageEnd = today.getFullYear() - birthDateEnd.getFullYear();
    this.functionYear();
    console.log()
    if ((ageEnd >= 0) || !(birthDateEnd.getFullYear())) {
      console.log('year')
      return this.checkDateEnd = true
    }
    else {
      console.log('ko hop le')
      return this.checkDateEnd = false
    }
  };
  public functionYear = (): boolean => {
    if (this.yearDateStart > this.yearDateEnd) {
      return this.yearBool = false
    } else {
      return this.yearBool = true
    }
  }
  //filter pading
  onPadingChange(event: any) {
    console.log('event', event)
    this.object.result.PageIndex = event;
    this.fetchApi(this.object.result)
  }
  //filter
  getUsers() {
    if ((this.checkdate === false) || (this.checkDateEnd === false) || (this.yearBool === false)) {
      return
    }
    if ((this.obj.StartDob === '') || (this.obj.EndDob === '') || (this.obj.Count === '')) {
      this.obj.Count = null;
      this.obj.StartDob = null;
      this.obj.EndDob = null;
    }
    //khởi tạo về trang đầu tiên
    this.obj.PageIndex = 1
    //loại bỏ html,javascript, space
    this.obj.Keywork = this.textKeyWork?.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "").trim();
    console.log('remove text :', this.obj.Keywork)
    console.log('datasearch', this.obj)
    this.fetchApi(this.obj)
  };
  //tìm kiểm, lấy danh sách người dùng
  fetchApi(obj: any) {
    this.service.getKeyWorkPading(obj).subscribe(data => {
      this.object = data;
      console.log('object', this.object)
      this.obj.totalRows = this.object.result.totalRows
      this.listUser = this.object.result.itemsData
      this.obj.PageIndex = this.object.result.pageIndex
      //this.listUser.reverse();
      console.log('data', this.listUser);
      this.checklength();
    });
  }
  reset() {
    this.obj.Count = null;
    this.textKeyWork = '';
    this.obj.StartDob = '';
    this.obj.EndDob = '';
    this.functionAge();
    this.functionAgeEnd();
    this.getUsers();
  }
  //kiểm tra kết quả null
  public checklength = (): boolean => {
    console.log(this.check)
    if (this.listUser.length == 0) {
      return this.check = false
    } else {
      return this.check = true
    }
    //return this.check
  }
  //link url theo id
  EditId(id: number) {
    this.id=id
    if(id>0){
      this.getRoute(id)
    }  
    //let url: string = "main/edit/" + id
    //this.router.navigate([url]);
    console.log('id',this.id)
  }
  //xóa người dùng
  deleteUser(id: number) {
    console.log('remove', id)
    if (confirm("bạn có chắc muốn xóa")) {
      this.service.deleteUser(id).subscribe(res => {
        this.dataRegister = res
        if (this.dataRegister != 0) {
          //alert('xóa thành công')
          this.getUsers();
        } else {
          alert('xóa thất bại')
        }
      })
    }
  }
  //reload
  reload(){
    location.reload()
  }
}
