import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatPage } from './cat-page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { CommentsService } from '../services/comments-service/comments-service';
import { AuthService } from '../services/auth-service/auth-service';
import { BackendService } from '../services/rest-backend/backend-service';

describe('CatPage', () => {
  let component: CatPage;
  let fixture: ComponentFixture<CatPage>;

  const avvistamentiServiceMock = {
    getById: jasmine.createSpy('getById').and.returnValue(of({
      id: 1,
      descrizione: 'test descrizione'
    }))
  };

  const commentsServiceMock = {
    getByAvvistamento: jasmine.createSpy('getByAvvistamento').and.returnValue(of([])),
    create: jasmine.createSpy('create').and.returnValue(of({}))
  };

  const authServiceMock = {
    isLogged: true,
    user: { id: 1, userName: 'test' }
  };

  const backendServiceMock = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CatPage,
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
        { provide: CommentsService, useValue: commentsServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: BackendService, useValue: backendServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
