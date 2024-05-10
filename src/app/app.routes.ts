import { Routes, CanActivateFn } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SubjectsComponent } from './doctor/subjects/subjects.component';
import { NewExamComponent } from './doctor/new-exam/new-exam.component';
import { ExamComponent } from './student/exam/exam.component';
import { StudentsComponent } from './doctor/students/students.component';
import { HomeComponent } from './home/home.component';
import { authTwoGuard } from './guards/auth-two.guard';
import { AuthService } from './auth/services/auth.service';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  {path:'' , redirectTo:'home' , pathMatch:'full'},
  {path:'register' , component:RegisterComponent,title:'Register'},
  {path:'login' , component:LoginComponent,title:'Login'},
  {path:'subjects' ,
  component:SubjectsComponent,
   title:'Subjects',
   canActivate:[authGuard]
  },
  {path:'new-exam' , component:NewExamComponent,title:'New-Exam',canActivate:[authTwoGuard]},
  {path:'exam/:id' , component:ExamComponent,title:'Exam',canActivate:[authGuard]},
  {path:'students' , component:StudentsComponent,title:'Students',canActivate:[authTwoGuard]},
  {path:'home' , component:HomeComponent,title:'Home'},
  {path:'**' , component:HomeComponent,title:'Home'}
];
