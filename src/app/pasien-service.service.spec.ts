import { TestBed } from '@angular/core/testing';

import { PasienServiceService } from './pasien-service.service';

describe('PasienServiceService', () => {
  let service: PasienServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasienServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
