import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service';
import { BackendService } from '../rest-backend/backend-service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  const backendServiceMock = {
    login: jasmine.createSpy('login').and.returnValue(of({ token: 'fake-token' }))
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: BackendService, useValue: backendServiceMock }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
