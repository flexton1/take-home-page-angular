import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<void> = new Subject<void>;

showValidationError: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<EditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public student: Student,
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService
  ) { }

    statusiStudenta: any[] = ['redovan', 'vanredan'];

  ngOnInit(): void { }

  close() {
    this.dialogRef.close();
    return window.location.reload();
    
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return;

    const updatedStudent: Student = {
      ...this.student,
      ...form.value,
    };
    this.studentService.addStudent(updatedStudent)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((data) => {
      console.log('response', data);
      
    });
    this.dialogRef.close();
    
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }

  
}
