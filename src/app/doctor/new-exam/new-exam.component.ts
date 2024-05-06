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
  FormControl,
  FormControlName,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../Services/doctor.service';

@Component({
  selector: 'app-new-exam',
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
  templateUrl: './new-exam.component.html',
  styleUrl: './new-exam.component.css',
})
export class NewExamComponent implements OnInit {
  name = new FormControl('');
  questionForm!: FormGroup;
  questions: any[] = [];
  correctName: any;
  staretAdd: boolean = false;
  preview : boolean=false;
  subjectName = '';
  stepperIndex = 0;
  id:any
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private service :DoctorService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    const model = {
      name: this.subjectName,
      questions:this.questions
    };
   
    if (this.preview) {
      this.stepperIndex = 2;
    }else{
      this.service.createSubject(model).subscribe((res:any)=>{
        this.preview=true;
        this.id=res.id;
        })
    }
  }

  createForm() {
    this.questionForm = this.fb.group({
      question: ['', [Validators.required]],
      answer1: ['', [Validators.required]],
      answer2: ['', [Validators.required]],
      answer3: ['', [Validators.required]],
      answer4: ['', [Validators.required]],
    });
  }
  createQuestion() {
    if (this.correctName) {
      const model = {
        question: this.questionForm.value.question,
        answer1: this.questionForm.value.answer1,
        answer2: this.questionForm.value.answer2,
        answer3: this.questionForm.value.answer3,
        answer4: this.questionForm.value.answer4,
        correctAnswer: this.questionForm.value[this.correctName],
      };
      this.questions.push(model);
      this.questionForm.reset();
    } else {
      this.toastr.error('يرجي اختيار الاجابة الصحيحة', '', {
        disableTimeOut: false,
        titleClass: 'toastr_title',
        messageClass: 'toastr_message',
        timeOut: 5000,
        closeButton: true,
      });
    }
  }

  getCorrect(event: any) {
    this.correctName = event.value;
  }

  start() {
    if (this.name.value == '') {
      this.toastr.error('يرجي ادخال اسم المادة', '', {
        disableTimeOut: false,
        titleClass: 'toastr_title',
        messageClass: 'toastr_message',
        timeOut: 5000,
        closeButton: true,
      });
    } else {
      if (this.name.value !== null) {
        this.staretAdd = true;
        this.subjectName = this.name.value;
      }
    }

    if (this.staretAdd) {
      this.stepperIndex = 1;
    }
  }

  clearForm()
  {
    this.questionForm.reset();
  }

  cancel(){
    this.questionForm.reset();
    this.questions=[];
    this.subjectName="";
    this.name.reset();
    this.stepperIndex=0;
    this.staretAdd=false;
  }

  delete(index:number){
    this.questions.splice(index,1);
    const model = {
      name: this.subjectName,
      questions:this.questions
    };
  
  this.service.updateSubject(model,this.id).subscribe(res=>{
    this.toastr.success('تم حذف السؤال بنجاح', '', {
      disableTimeOut: false,
      titleClass: 'toastr_title',
      messageClass: 'toastr_message',
      timeOut: 5000,
      closeButton: true,
    });
  })
  }
}
