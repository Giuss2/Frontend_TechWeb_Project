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

  @Input() avvistamenti: Avvistamento[] = [];

  // Evento che emette l'id del gatto quando un marker viene cliccato
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

    // Forza il ridimensionamento corretto
    setTimeout(() => this.map.invalidateSize(), 300);

    this.loadMarkers();
  }

  private loadMarkers(): void {
  this.avvistamenti.forEach(avv => {


    const iconaGatto = L.icon({
        iconUrl: avv.img,
        iconSize: [40, 40],       // dimensione finale del marker sulla mappa
        iconAnchor: [20, 40],     // punto della icona che corrisponde alla posizione geografica
        popupAnchor: [0, -40],    // posizione del popup rispetto al marker
        className: 'marker-gatto',
    });

    const marker = L.marker([avv.lat, avv.lng], { icon: iconaGatto })
      .addTo(this.map)
      .bindPopup(`
        <div class="marker-tooltip">
          <img src="${avv.img}" class="marker-img">
          <div class="marker-title">${avv.titolo}</div>
        </div>
      `);

    marker.on('click', () => {
      this.markerClick.emit(avv.id);
    });
  });
}

}
