import { TestBed } from '@angular/core/testing';

import { LoactionSrvcService } from './loaction-srvc.service';

describe('LoactionSrvcService', () => {
  let service: LoactionSrvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoactionSrvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
