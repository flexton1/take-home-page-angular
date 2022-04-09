import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public student: Student,
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  statusiStudenta: any[] = ['redovan', 'vanredan'];

  close() {
    this.dialogRef.close();
  }
}
