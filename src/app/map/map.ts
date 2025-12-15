import { AfterViewInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

export interface Avvistamento {
  id: number;
  userId: number;
  titolo: string;
  lat: number;
  lng: number;
  descrizione: string;
  img: string; 
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrls: ['./map.scss'],
})

export class MapComponent implements AfterViewInit {
  @Input() lat: number = 42.5;
  @Input() lng: number = 12.5;
  @Input() avvistamenti: Avvistamento[] = [];

  @Output() latChange = new EventEmitter<number>();
  @Output() lngChange = new EventEmitter<number>();
  @Output() markerClick = new EventEmitter<number>();

  private map!: L.Map;

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap() {
    const mapDiv = document.getElementById('map')!;
    this.map = L.map(mapDiv, {
      center: [this.lat, this.lng],
      zoom: 6
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.lat = e.latlng.lat;
      this.lng = e.latlng.lng;
      this.latChange.emit(this.lat);
      this.lngChange.emit(this.lng);
    });

    this.loadMarkers();
  }

  private loadMarkers() {
    this.avvistamenti.forEach(avv => {
      const marker = L.marker([avv.lat, avv.lng]).addTo(this.map);
      marker.on('click', () => this.markerClick.emit(avv.id));
    });
  }
}
