import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private route:Router) { }
  public hide=true
  ngOnInit(): void {
     this.hide;
  }
  login(){
    alert('click')
    this.route.navigate(['main'])
  }
}
