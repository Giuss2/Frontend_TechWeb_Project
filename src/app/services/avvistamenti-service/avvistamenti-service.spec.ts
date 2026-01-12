import { TestBed } from '@angular/core/testing';
import { AvvistamentiService } from './avvistamenti-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AvvistamentiService', () => {
  let service: AvvistamentiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(AvvistamentiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
