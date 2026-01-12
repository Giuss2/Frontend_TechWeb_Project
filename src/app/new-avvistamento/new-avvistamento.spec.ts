import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewAvvistamento } from './new-avvistamento';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { AuthService } from '../services/auth-service/auth-service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('NewAvvistamento', () => {
  let component: NewAvvistamento;
  let fixture: ComponentFixture<NewAvvistamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAvvistamento],
      providers: [
        {
          provide: AvvistamentiService,
          useValue: {
            create: jasmine.createSpy('create').and.returnValue(of({ id: 1 }))
          }
        },
        {
          provide: AuthService,
          useValue: {
            user: { id: 123 }
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

    fixture = TestBed.createComponent(NewAvvistamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
