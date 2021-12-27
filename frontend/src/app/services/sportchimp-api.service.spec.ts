import { TestBed } from '@angular/core/testing';

import { SportChimpApiService } from './sportchimp-api.service';

describe('SportChimpApiService', () => {
  let service: SportChimpApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportChimpApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
