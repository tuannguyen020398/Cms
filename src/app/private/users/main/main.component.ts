import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public token=localStorage.getItem('token');
  constructor(private route:Router) { }

  ngOnInit(): void {
    if(this.token==null){
      this.route.navigate(['login'])
    }
  }

}
