import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Homepage } from './homepage';
import { RouterTestingModule } from '@angular/router/testing';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { AuthService } from '../services/auth-service/auth-service';
import { BackendService } from '../services/rest-backend/backend-service';


@Component({
  selector: 'app-map',
  standalone: true,
  template: ''
})
class MockMapComponent {}

describe('Homepage', () => {
  let component: Homepage;
  let fixture: ComponentFixture<Homepage>;

  const authServiceMock = {
    isLogged: false,
    logout: jasmine.createSpy('logout')
  };

  const backendServiceMock = {};

  const avvistamentiServiceMock = {
    getAll: jasmine.createSpy('getAll')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Homepage,
        MockMapComponent, 
        RouterTestingModule
      ],
      providers: [
  {
    provide: AvvistamentiService,
    useValue: {
      getAll: jasmine.createSpy('getAll').and.returnValue(of([]))
    }
  },
  {
    provide: AuthService,
    useValue: {
      user: null,
      isLogged: false
    }
  },
  {
    provide: BackendService,
    useValue: {}   // mock vuoto, basta per spezzare la catena
  }
]


    }).compileComponents();

    fixture = TestBed.createComponent(Homepage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
