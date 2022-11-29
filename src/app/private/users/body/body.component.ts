import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  public selectArray: Array<{ id: number, text: string }> = [
    { id: 1, text: 'Nam' },
    { id: 2, text: 'Nữ' },
    { id: 3, text: 'Khác' },
  ];

  constructor(private service: CommonService,private router:Router) { }
  dataRegister:any={}
  listUser: any = [];
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.service.getUser().subscribe(data => {
      this.listUser = data;
      console.log('data', this.listUser);
    });

  };
  formatDate(date: string): string {
    const dates = new Date(date);
    return dates.getDate() + '/' + (dates.getMonth() + 1) + '/' + dates.getFullYear();
  };
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
