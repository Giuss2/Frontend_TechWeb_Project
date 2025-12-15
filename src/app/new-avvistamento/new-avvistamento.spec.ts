import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAvvistamento } from './new-avvistamento';

describe('NewAvvistamento', () => {
  let component: NewAvvistamento;
  let fixture: ComponentFixture<NewAvvistamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAvvistamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAvvistamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
