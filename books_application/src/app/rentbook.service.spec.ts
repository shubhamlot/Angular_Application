import { TestBed } from '@angular/core/testing';

import { RentbookService } from './rentbook.service';

describe('RentbookService', () => {
  let service: RentbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
