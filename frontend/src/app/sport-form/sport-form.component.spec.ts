import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportFormComponent } from './sport-form.component';

describe('SportFormComponent', () => {
  let component: SportFormComponent;
  let fixture: ComponentFixture<SportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
