import { TestBed } from '@angular/core/testing';

import { EventSrvcService } from './event-srvc.service';

describe('EventSrvcService', () => {
  let service: EventSrvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventSrvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
