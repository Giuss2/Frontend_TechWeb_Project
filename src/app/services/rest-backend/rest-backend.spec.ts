import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestBackend } from './rest-backend';

describe('RestBackend', () => {
  let component: RestBackend;
  let fixture: ComponentFixture<RestBackend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestBackend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestBackend);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
