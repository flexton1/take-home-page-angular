import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from 'src/app/model/student';

@Component({
  selector: 'app-studenti-item',
  templateUrl: './studenti-item.component.html',
  styleUrls: ['./studenti-item.component.scss']
})
export class StudentiItemComponent implements OnInit {

  @Input() student?: Student;

  @Output() editClicked: EventEmitter<void> = new EventEmitter();
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter();
  @Output() detailsClicked: EventEmitter<void> = new EventEmitter();
confirmDelete: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onEditClicked() {
    this.editClicked.emit();
  }

onDetailsClicked(){
  this.detailsClicked.emit();
}

  onDeleteClicked() {
    this.deleteClicked.emit();
  }
}
