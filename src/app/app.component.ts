import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

import { AuthService } from './auth/services/auth.service';
import { HomeComponent } from './home/home.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterModule ,RouterOutlet,NavbarComponent,HomeComponent ],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private service:AuthService)
  {

  }
  ngOnInit(): void {
    this.getUserData()
  }
  getUserData(){
    this.service.getRole().subscribe(res=>{
    this.service.user.next(res)
    })
  }
}
