import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { Filter } from 'src/app/model';
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
  constructor(private service: CommonService,private router:Router) { }
  p: number = 1;
  dataRegister:any={}
  object:any={}
  listUser: any = []; 
  public obj=new Filter;
  check!:boolean;
  ngOnInit(): void {
    this.getUsers();
    console.log(localStorage.getItem('token'));
  }
  // getUsers() {
  //   this.service.getUser().subscribe(data => {
  //     this.listUser = data;
  //     console.log('data', this.listUser);
  //   });
  // };
  getUsers() {
    // if(this.obj.Count==undefined)
    // {
    //   this.obj.Count=''
    // }
    console.log('datasearch',this.obj)
    this.service.getKeyWorkPading(this.obj).subscribe(data => {     
      this.object = data;
      this.listUser=this.object.result.itemsData
      this.listUser.reverse();
      console.log('data', this.listUser);
      this.checklength();
    });
  };
  formatDate(date: string): string {
    const dates = new Date(date);
    return dates.getDate() + '/' + (dates.getMonth() + 1) + '/' + dates.getFullYear();
  };
 public checklength=():boolean=>{
  console.log(this.check)
    if(this.listUser.length==0)
    {
      return this.check=false
    }else{
      return this.check=true
    }
    //return this.check
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
  EditId(id:Number){
    let url: string = "main/edit/" + id
        this.router.navigate([url]);
  }
  deleteUser(id:number){
    console.log('remove',id)
    if(confirm("bạn có chắc muốn xóa")){
      this.service.deleteUser(id).subscribe(res=>{
        this.dataRegister=res
        if(this.dataRegister!=0){
          alert('xóa thành công')
          this.getUsers();
        }else{
          alert('xóa thất bại')
        }
      })
    }   
  }
}
