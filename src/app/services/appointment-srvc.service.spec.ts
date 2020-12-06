import { TestBed } from '@angular/core/testing';

import { AppointmentSrvcService } from './appointment-srvc.service';

describe('AppointmentSrvcService', () => {
  let service: AppointmentSrvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentSrvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
