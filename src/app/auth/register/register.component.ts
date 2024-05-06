import { Component, OnInit } from '@angular/core';
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
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
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
  ReactiveFormsModule,
   ],
   
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  userForm!:FormGroup;
  students:any[]=[];
constructor(private fb:FormBuilder,private router:Router,private service:AuthService,private toastr: ToastrService)
{

}

 ngOnInit(): void {
   this.createForm();
   this.getStudents()
 }
 
 createForm()
 {
  this.userForm=this.fb.group({
    username:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    confirmpassword:['',[Validators.required]],
  })
 }

 getStudents()
 {
  this.service.getUsers('students').subscribe((res:any)=>{
  this.students=res
  })
 }
 submit(){
  const model={
    username:this.userForm.value.username,
    email:this.userForm.value.email,
    password:this.userForm.value.password,
  }
  let index=this.students.findIndex(item=>item.email==this.userForm.value.email)
  if(index !==-1)
    {
      this.toastr.error('الايميل موجود مسبقا','',{
        disableTimeOut:false,
        titleClass:'toastr_title',
        messageClass:'toastr_message',
        timeOut:5000,
        closeButton:true
      });
    }else{
      this.service.createUser(model).subscribe(res => {
        this.toastr.success('تم انشاء الحساب بنجاح','',{
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

}
