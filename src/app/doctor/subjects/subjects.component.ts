import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../Services/doctor.service';
import { AuthService } from '../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [
    CommonModule ,
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
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css',
})
export class SubjectsComponent implements OnInit {
  subjects: any[] = [];
  user: any = {}
  id:any
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private service: DoctorService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.getAllSubject();
    this.getUserInfo()
  }

  delete(index:any){
   
    console.log("Index:", index);
    console.log("Subjects:", this.subjects);
    let id=this.subjects[index].id
    //console.log("id:", id);
    this.subjects.splice(index,1);
    console.log("Subjects:", this.subjects);
    console.log("id:", id);
    this.service.delete(id).subscribe(res=>{
      this.toastr.success('تم حذف المادة بنجاح')
    });
   
    
  }

  getAllSubject() {
    this.service.getAllSubject().subscribe((res: any) => {
      this.subjects = res;
    });
  }

  getUserInfo() {
    this.auth.getRole().subscribe((res) => {
      this.user = res;
      console.log(this.user)
    });
  }
}
