import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DetailsComponent } from '../components/details/details.component';
import { EditStudentComponent } from '../components/edit-student/edit-student.component';
import { Student } from '../model/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
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
    this.studentService.getAllStudents().subscribe((data)=> (this.studenti = data));
  }

onAddClicked(){
  this.showAddStudent = !this.showAddStudent;
}

  editStudent(student: Student){
     let dialogRef = this.dialog.open(EditStudentComponent, {
      width: '70%',
      data: student,
    });

    dialogRef.afterClosed().subscribe((result) => {
     this.scroller.scrollToAnchor(`${student.pkStudentId}`)
    });
  }

  detailsStudent(student: Student){
    this.dialog.open(DetailsComponent, {
      width: '70%',
      data: student,
    });
  }
  

  deleteStudent(id: number){
    	this.studentService.deleteStudent(id).subscribe((data) => {
        console.log(' deleted response', data);
        this._router.navigateByUrl('/student');
        return window.location.reload();;
  })};
    

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
      this.studentService.getAllStudents().subscribe((data)=> (this.studenti = data));
    }
  }
}
