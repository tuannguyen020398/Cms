import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public token=localStorage.getItem('token');
  
  constructor(private route:Router) { }

  ngOnInit(): void {

  }
  logout(){
    if(this.token!=null)
    {
      localStorage.removeItem('token')
      this.route.navigate(['login'])
    }    
  }
}
