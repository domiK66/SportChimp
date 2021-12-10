import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportListComponent } from './sport-list.component';

describe('SportListComponent', () => {
  let component: SportListComponent;
  let fixture: ComponentFixture<SportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
