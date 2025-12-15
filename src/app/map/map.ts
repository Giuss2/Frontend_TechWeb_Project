import { AfterViewInit, Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/cats_imgs/marker-icon-2x.png',
  iconUrl: 'assets/cats_imgs/marker-icon.png',
  shadowUrl: 'assets/cats_imgs/marker-shadow.png',
});

export interface Avvistamento {
  id: number;
  userId: number;
  titolo: string;
  lat: number;
  lng: number;
  descrizione: string;
  img: string; 
  createdAt?: string;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrls: ['./map.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MapComponent implements AfterViewInit {
  private selectedMarker?: L.Marker;
  @Input() editable: boolean = false;
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

    this.loadMarkers();
    
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if (!this.editable) return; // se non siamo in modalità edit, esci subito

      this.lat = e.latlng.lat;
      this.lng = e.latlng.lng;
      this.latChange.emit(this.lat);
      this.lngChange.emit(this.lng);

      // Rimuove il marker precedente se esiste
      if (this.selectedMarker) {
        this.map.removeLayer(this.selectedMarker);
      }

      // Aggiunge il nuovo marker sulla posizione cliccata
      this.selectedMarker = L.marker([this.lat, this.lng]).addTo(this.map);
    });
  }

private loadMarkers() {
  this.avvistamenti.forEach(avv => {
    const popupContent = document.createElement('div');
    popupContent.className = 'marker-tooltip';

    const img = document.createElement('img');
    img.src = avv.img;
    img.className = 'marker-img';
    popupContent.appendChild(img);

    const titleLink = document.createElement('a');
    titleLink.href = `/gatto/${avv.id}`;
    titleLink.textContent = avv.titolo;
    titleLink.className = 'marker-title-link';
    popupContent.appendChild(titleLink);

    const dateDiv = document.createElement('div');
    dateDiv.className = 'marker-date';
    dateDiv.textContent = avv.createdAt ? new Date(avv.createdAt).toLocaleDateString() : 'Data non disponibile';
    popupContent.appendChild(dateDiv);

    const marker = L.marker([avv.lat, avv.lng]).addTo(this.map);

    marker.bindPopup(popupContent, { closeButton: true, autoClose: false });

    // Click sul marker apre solo il popup
    marker.on('click', (e) => {
      marker.openPopup();
    });
  });
}


}
