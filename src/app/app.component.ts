import { Component, signal, AfterViewInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit{
  private map!: L.Map;
  constructor(){}
  showWelcomeMessage = signal(true);

  ngOnInit() {
    const seen = localStorage.getItem('seenWelcome');
    this.showWelcomeMessage.set(!seen);
  }

  closeWelcomeMessage() {
    this.showWelcomeMessage.set(false);
    localStorage.setItem('seenWelcome', 'true');
  }

   ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Centra la mappa su una posizione iniziale (es. Italia)
    this.map = L.map('map', {
      center: [41.9028, 12.4964], // lat, lng (Roma)
      zoom: 6
    });

    // Aggiunge i tiles di OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
      }, 100);

     // aggiungere un marker
    L.marker([41.9028, 12.4964])
      .addTo(this.map)
      .bindPopup('Gatto segnalato qui 🐾');
  }

}
