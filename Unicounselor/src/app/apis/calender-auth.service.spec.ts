import { TestBed } from '@angular/core/testing';

import { CalenderAuthService } from './calender-auth.service';

describe('CalenderAuthService', () => {
  let service: CalenderAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalenderAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
