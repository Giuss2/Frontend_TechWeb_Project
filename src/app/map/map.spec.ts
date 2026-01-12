import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Map } from './map';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { of } from 'rxjs';

describe('Map', () => {
  let component: Map;
  let fixture: ComponentFixture<Map>;

  const avvistamentiServiceMock = {
    getAll: jasmine.createSpy('getAll').and.returnValue(of([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Map,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AvvistamentiService, useValue: avvistamentiServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Map);
    component = fixture.componentInstance;

    // Mock del div #map per evitare crash su document.getElementById
    const mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    document.body.appendChild(mapDiv);

    fixture.detectChanges();
  });

  afterEach(() => {
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
      mapDiv.remove();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
