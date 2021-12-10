import { TestBed } from '@angular/core/testing';

import { SportService } from './sport.service';

describe('SportService', () => {
  let service: SportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
