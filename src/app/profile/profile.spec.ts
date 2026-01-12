import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfiloComponent } from './profile';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth-service/auth-service';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { of } from 'rxjs';

describe('Profile', () => {
  let component: ProfiloComponent;
  let fixture: ComponentFixture<ProfiloComponent>;

  const authServiceMock = {
    user: {
      id: 1,
      username: 'testuser'
    }
  };

  const avvistamentiServiceMock = {
    getByUser: jasmine.createSpy('getByUser').and.returnValue(of([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfiloComponent,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: AvvistamentiService, useValue: avvistamentiServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
