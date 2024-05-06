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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../doctor/Services/doctor.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [
    CommonModule,
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
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
})
export class ExamComponent implements OnInit {
  user: any;
  showResult: boolean = false;
  validExam: boolean = true;
  id: any;
  subject: any;
  total: number = 0;
  studentInfo: any;
  userSubjects: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private service: DoctorService,
    private toastr: ToastrService,
    private auth: AuthService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.gedtSubject();
    this.getLogedInUser();
  }
  ngOnInit(): void {}

  gedtSubject() {
    this.service.getSubject(this.id).subscribe((res) => {
      this.subject = res;
    });
  }

  delete(index: number) {
    this.subject.questions.splice(index, 1);
    const model = {
      name: this.subject.name,
      questions: this.subject.questions,
    };

    this.service.updateSubject(model, this.id).subscribe((res) => {
      this.toastr.success('تم حذف السؤال بنجاح', '', {
        disableTimeOut: false,
        titleClass: 'toastr_title',
        messageClass: 'toastr_message',
        timeOut: 5000,
        closeButton: true,
      });
    });
  }

  getLogedInUser() {
    this.auth.getRole().subscribe((res) => {
      this.user = res;
      console.log(res);
      this.getUserData();
    });
  }
  getUserData() {
    this.auth.getStudent(this.user.userId).subscribe((res: any) => {
      this.studentInfo = res;
      this.userSubjects = res?.subjects ? res?.subjects : [];
      this.checkValidExam()
    });
  }
  getAnswer(event: any) {
    let value = event.value,
      questionIndex = event.source.name;
    this.subject.questions[questionIndex].studentAnswer = value;
    console.log(this.subject.questions);
  }

  getResult() {
    this.total = 0;
    for (let x in this.subject.questions) {
      if (
        this.subject.questions[x].studentAnswer ==
        this.subject.questions[x].correctAnswer
      ) {
        this.total++;
      }
    }
    this.showResult = true;
    this.userSubjects.push({
      name: this.subject.name,
      id: this.id,
      degree: this.total,
    });
    const model = {
      username: this.studentInfo.username,
      email: this.studentInfo.email,
      password: this.studentInfo.password,
      subjects: this.userSubjects,
    };
    this.auth.updateStudent(this.user.userId, model).subscribe((res) => {
      this.toastr.success('تم تسجيل النتيجة بنجاح');
    });
  }

  checkValidExam() {
    for (let x in this.userSubjects) {
      if (this.userSubjects[x].id == this.id) {
        this.total=this.userSubjects[x].degree
        this.validExam = false;
        this.toastr.warning('لقد انجزت هذا الاختبار مسبقا')
      }
    }
  }
}
