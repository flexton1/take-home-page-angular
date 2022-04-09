import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentiItemComponent } from './studenti-item.component';

describe('StudentiItemComponent', () => {
  let component: StudentiItemComponent;
  let fixture: ComponentFixture<StudentiItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentiItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
