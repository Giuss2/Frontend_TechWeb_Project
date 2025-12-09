import { TestBed } from '@angular/core/testing';

import { AvvistamentiService } from './avvistamenti-service';

describe('AvvistamentiService', () => {
  let service: AvvistamentiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvvistamentiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
