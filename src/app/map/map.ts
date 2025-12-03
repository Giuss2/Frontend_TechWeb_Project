import { AfterViewInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

export interface Avvistamento {
  id: number;
  userId: number;
  titolo: string;
  lat: number;
  lng: number;
  descrizione?: string;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrls: ['./map.scss'],
})
export class MapComponent implements AfterViewInit {

  @Input() avvistamenti: Avvistamento[] = [];

  // Evento che emette l'id dell'utente quando un marker viene cliccato
  @Output() markerClick = new EventEmitter<number>();

  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
  const mapDiv = document.getElementById('map')!;
  this.map = L.map(mapDiv, {
    center: [41.9028, 12.4964],
    zoom: 6
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(this.map);

  setTimeout(() => this.map.invalidateSize(), 200);

  this.loadMarkers();
}

  private loadMarkers(): void {
    this.avvistamenti.forEach(avv => {
      const marker = L.marker([avv.lat, avv.lng])
        .addTo(this.map)
        .bindPopup(`<strong>${avv.titolo}</strong><br>${avv.descrizione || ''}<br><em>Clicca per vedere il profilo</em>`);

      marker.on('click', () => {
        this.markerClick.emit(avv.userId);
      });
    });
  }

}
