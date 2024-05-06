import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatRadioModule,
    MatSidenavModule,
    MatStepperModule,
    MatTableModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    RouterModule,
  ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  users:any[]=[];
  type:string='students'
  constructor(private fb:FormBuilder,private router:Router,private service:AuthService,private toastr: ToastrService)
  {

  }
  ngOnInit(): void {
    this.createForm();
    this.getUsers()
  }
  
  createForm()
  {
   this.loginForm=this.fb.group({
     type:[this.type],
     email:['',[Validators.required,Validators.email]],
     password:['',[Validators.required]],
   })
  }
 
  getUsers()
  {
   this.service.getUsers(this.type).subscribe((res:any)=>{
   this.users=res
   })
  }
  submit(){
   
   let index=this.users.findIndex(item=>item.email==this.loginForm.value.email && item.password==this.loginForm.value.password)
   if(index ==-1)
     {
       this.toastr.error('الايميل او كلمة المرور غير صحيحة','',{
         disableTimeOut:false,
         titleClass:'toastr_title',
         messageClass:'toastr_message',
         timeOut:5000,
         closeButton:true
       });
     }else{
      const model={
        username:this.users[index].username,
        role:this.type,
        userId:this.users[index].id,
      }
       this.service.login(model).subscribe(res => {
        this.service.user.next(res)
         this.toastr.success('تم تسجيل الدخول بنجاح','',{
           disableTimeOut:false,
           titleClass:'toastr_title',
           messageClass:'toastr_message',
           timeOut:5000,
           closeButton:true
         });
         this.router.navigate(['/subjects'])
        });
     }
  
   }

   getRole(event:any){
   this.type=event.value;
     this.getUsers();
   }
}
