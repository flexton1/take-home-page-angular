import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, Subscriber, Subscription, takeUntil } from 'rxjs';
import { AddStudentComponent } from '../components/add-student/add-student.component';
import { DetailsComponent } from '../components/details/details.component';
import { EditStudentComponent } from '../components/edit-student/edit-student.component';
import { Student } from '../model/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<void> = new Subject<void>;

  notifyAboutChange: Subscription = this.studentService.eventEmitterNotifier
  .pipe(takeUntil(this._unsubscribeAll))
  .subscribe((e) => {
    this.loadData();
  })

student: Student = new Student();

studenti: Array<Student> = [];
showAddStudent: boolean = false;


  constructor(
  private studentService: StudentService,
  private dialog: MatDialog,
  private _router: Router,
  private scroller: ViewportScroller
  ) { }

  ngOnInit() {
    this.loadData();
  }

onAddClicked(){
  this.showAddStudent = !this.showAddStudent;
}

closeAddStudent(){
    this.showAddStudent = false;
}

  editStudent(student: Student){
     let dialogRef = this.dialog.open(EditStudentComponent, {
      width: '70%',
      data: student,
    });

    dialogRef.afterClosed()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((result) => {
     this.scroller.scrollToAnchor(`${student.pkStudentId}`)
    });
  }

loadData(){
  this.studentService.getAllStudents()
  .pipe(takeUntil(this._unsubscribeAll))
  .subscribe((data)=> (this.studenti = data));

}

  hideAddStudent(){
    this.showAddStudent = false;
  }

  detailsStudent(student: Student){
    this.dialog.open(DetailsComponent, {
      width: '70%',
      data: student,
    });
  }


  deleteStudent(id: number){
    	this.studentService.deleteStudent(id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {

     console.log(data);


  });
 return this.studenti = this.studenti.filter((s) => s.pkStudentId !== id);

  // return window.location.reload();

};


  public searchStudents(key: string): void{
    const result: Student[] = [];
    for(const student1 of this.studenti){
      if(student1.ime?.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || student1.prezime?.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || student1.godinaStudija?.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || student1.brojIndeksa?.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || student1.statusStudenta?.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
         result.push(student1);
      }
    }
    this.studenti = result;

    if(result.length === 0 || !key){
      this.studentService.getAllStudents()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data)=> (this.studenti = data));
    }
  }

  ngOnDestroy(): void {
    
    this._unsubscribeAll.next();
  }
}
