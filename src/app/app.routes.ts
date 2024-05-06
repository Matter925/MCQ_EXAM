import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SubjectsComponent } from './doctor/subjects/subjects.component';
import { NewExamComponent } from './doctor/new-exam/new-exam.component';
import { ExamComponent } from './student/exam/exam.component';
import { StudentsComponent } from './doctor/students/students.component';

export const routes: Routes = [
  {path:'register' , component:RegisterComponent,title:'Register'},
  {path:'login' , component:LoginComponent,title:'Login'},
  {path:'subjects' , component:SubjectsComponent,title:'Subjects'},
  {path:'new-exam' , component:NewExamComponent,title:'New-Exam'},
  {path:'exam/:id' , component:ExamComponent,title:'Exam'},
  {path:'students' , component:StudentsComponent,title:'Students'},
  {path:'**' , redirectTo:'exam' , pathMatch:'full'}
];
