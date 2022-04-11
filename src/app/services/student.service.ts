import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/shared/auth.service';
import { StatusStudenta } from '../model/status-studenta';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  constructor(private _httpClient: HttpClient,
    private authService: AuthService) { }

    getUserName(): string{
      return this.authService.getUserName();
    }

getAllStudents() {
  return this._httpClient.get<Student[]>('http://localhost:8080/api/student/tabela/'+ `${this.getUserName()}`).pipe(response => response);
}

addStudent(student: Student): Observable<Student>{
  
  return this._httpClient.post<Student>("http://localhost:8080/api/student/edit/" + `${this.getUserName()}`, student);
}

saveStatus(student: Student): Observable<StatusStudenta> {
let statusStudenta: StatusStudenta = new StatusStudenta();
statusStudenta.pkStudentId = student.pkStudentId;
statusStudenta.statusStudenta = student.statusStudenta;

  return this._httpClient.post<Student>("http://localhost:8080/api/student/status", statusStudenta);
}

deleteStudent(id: number): Observable<any>{
  return this._httpClient.delete("http://localhost:8080/api/student/delete/" + `${id}`);
}
}
