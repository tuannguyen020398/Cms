import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { LoginModel } from 'src/app/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  check=false;
  public loginmodel=new LoginModel;
  dataLogin:any={}
  constructor(private route:Router,private activateroute: ActivatedRoute,private service: CommonService) { }
  public hide=true
  ngOnInit(): void {
     this.hide;
  }
  login(){
    console.log('obj',this.loginmodel)
    this.service.authencateUser(this.loginmodel).subscribe(res=>{
      this.dataLogin=res
      console.log('token',this.dataLogin.resultObj)
      if(this.dataLogin.isSuccessed==true){
        alert('đăng nhập thành công')
        localStorage.setItem('token',this.dataLogin.resultObj)
        this.route.navigate(['main'])
      }else{
        console.log('fail',this.dataLogin.message)
        alert(this.dataLogin.message)
      }
      
    })
  }
}
