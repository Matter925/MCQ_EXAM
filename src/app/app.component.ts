import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterModule ,RouterOutlet,NavbarComponent],
  
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
