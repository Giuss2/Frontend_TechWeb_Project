import { AfterViewInit, Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { OnChanges } from '@angular/core';

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
  foto: string; 
  dataInserimento: string;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrls: ['./map.scss'],
  encapsulation: ViewEncapsulation.None
})

export class Map implements AfterViewInit, OnChanges {
   constructor(
    private avvistamentiService: AvvistamentiService,
    private router: Router
  ) {}
  
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
    
    this.loadMarkers(this.avvistamenti);
  }

  ngOnChanges() {
  if (this.map && this.avvistamenti.length > 0) {
    this.loadMarkers(this.avvistamenti);
  }
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

private loadMarkers(avvistamenti: Avvistamento[]) {
  // Prima rimuoviamo tutti i marker esistenti
  if (this.map) {
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
  }

  const markers: L.Marker[] = [];

  avvistamenti.forEach(avv => {
    const popupContent = document.createElement('div');
    popupContent.className = 'marker-tooltip';

    // Immagine
    const img = document.createElement('img');
    
    img.src= this.getFotoUrl(avv.foto);
    img.className = 'marker-img';
    img.addEventListener('click', () => {
      this.router.navigate(['/cat', avv.id]);
    });
    popupContent.appendChild(img);

     // Titolo cliccabile
    const titleLink = document.createElement('a');
    titleLink.textContent = avv.titolo;
    titleLink.href = '#';
    titleLink.addEventListener('click', (event) => {
      event.preventDefault();
      this.router.navigate(['/cat', avv.id]);
    });
    popupContent.appendChild(titleLink);

    // Data
    const dateDiv = document.createElement('div');
    dateDiv.className = 'marker-date';
    const createdDate = new Date(avv.dataInserimento);
    dateDiv.textContent = !isNaN(createdDate.getTime()) ? createdDate.toLocaleDateString() : 'Data non disponibile';
    popupContent.appendChild(dateDiv);

    // Marker
    const marker = L.marker([avv.lat, avv.lng]).addTo(this.map);
    marker.bindPopup(popupContent, { autoClose: false });
    markers.push(marker);
  });

  // logica per centrare la mappa
  if (markers.length === 0) { // Nessun marker -> centra Italia
    this.map.setView([42.5, 12.5], 6);
  } else if (markers.length === 1) {    //UN SOLO marker (accade nelle cat pages)
    this.map.setView([avvistamenti[0].lat, avvistamenti[0].lng], 10); // zoom ravvicinato
  } else {  //almeno due marker in su
    const group = L.featureGroup(markers);  
    this.map.fitBounds(group.getBounds(), { padding: [50, 50] });
  }
}

getFotoUrl(foto: string): string {
  // Se non c'è nessuna immagine, usa quella di default
  if (!foto) {
    return 'assets/cats_imgs/gatto_default.jpg';
  }

  // Altrimenti, usa sempre il file locale salvato
  return `assets/cats_imgs/${foto}`;
}

}
