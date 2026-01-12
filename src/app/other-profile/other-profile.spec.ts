import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtherProfile } from './other-profile';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { UserService } from '../services/user-service/user-service';

describe('OtherProfile', () => {
  let component: OtherProfile;
  let fixture: ComponentFixture<OtherProfile>;

  const avvistamentiServiceMock = {
    getByUser: jasmine.createSpy('getByUser').and.returnValue(of([]))
  };

  const userServiceMock = {
    getUserProfile: jasmine.createSpy('getUserProfile').and.returnValue(of({ id: 1, name: 'Test User' }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OtherProfile,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        },
        { provide: AvvistamentiService, useValue: avvistamentiServiceMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
