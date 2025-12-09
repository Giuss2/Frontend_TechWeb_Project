import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatPage } from './cat-page';

describe('CatPage', () => {
  let component: CatPage;
  let fixture: ComponentFixture<CatPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
