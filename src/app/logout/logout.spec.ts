import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Logout } from './logout';
import { AuthService } from '../services/auth-service/auth-service';
import { Router } from '@angular/router';

describe('Logout', () => {
  let component: Logout;
  let fixture: ComponentFixture<Logout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logout],
      providers: [
        {
          provide: AuthService,
          useValue: {
            logout: jasmine.createSpy('logout')
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Logout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
