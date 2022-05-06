import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  @Output() public hideAddStudent = new EventEmitter ();

  student: Student = new Student;
showValidationError: boolean = false;

  constructor(private studentService: StudentService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

onFormSubmit(form: NgForm){
  if (form.invalid) {
    return (this.showValidationError = true);
  } else {
    this.studentService.addStudent(this.student).subscribe((data) => {
      console.log('response', data);
      this.router.navigate([this.router.url]);
    });

    this.showValidationError = false;
   form.reset();
    this.hideAddStudent.emit();
     return this.toastr.success('Dodali ste studenta');
  }
}

statusiStudenta: any = ['redovan', 'vanredan'];

}
