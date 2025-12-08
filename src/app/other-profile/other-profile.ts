import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MapComponent, Avvistamento } from '../map/map';

@Component({
  selector: 'app-other-profile',
  imports: [],
  templateUrl: './other-profile.html',
  styleUrl: './other-profile.scss',
})
export class OtherProfile implements OnInit {
 userId!: number;
  avvistamenti: Avvistamento[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      // CARICA gli avvistamenti di quell'utente dal server
      this.caricaAvvistamentiUtente(this.userId);
    });
  }

  caricaAvvistamentiUtente(userId: number) {
    // TODO: sostituire con chiamata API
    this.avvistamenti = [
      { id: 1, userId, titolo: 'Gatto rosso a Torino', lat: 45.0703, lng: 7.6869, descrizione: 'Molto socievole' }
    ];
  }
}
