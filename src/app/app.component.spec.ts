import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth-service/auth-service';
import { BackendService } from './services/rest-backend/backend-service';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [
      AppComponent,
      RouterTestingModule   
    ],
    providers: [
      {
        provide: BackendService,
        useValue: {}
      },
      {
        provide: AuthService,
        useValue: {
          init: jasmine.createSpy(),
          logout: jasmine.createSpy(),
          login: jasmine.createSpy()
        }
      }
    ]
  }).compileComponents();
});
