import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map';
import { Router } from '@angular/router';

@Component({
  selector: 'other-profile',
  standalone: true,
  templateUrl: './other-profile.html',
  styleUrls: ['./other-profile.scss'],
  imports: [CommonModule, MapComponent]
})
export class OtherProfile implements OnInit {

   userId!: number;
  avvistamenti: any[] = [];
  user: any = null;

  constructor(
    private router: Router,
    private avvService: AvvistamentiService
  ) {}

  ngOnInit() {
    // legge l'URL corrente e estrae l'id
    // esempio URL = /utente/3
    const urlSegments = this.router.url.split('/');
    this.userId = Number(urlSegments[2]); // 2 = terzo segmento della URL

    // dati fake per l'utente
    this.user = {
      id: this.userId,
      username: "Utente_" + this.userId,
      avatarUrl: "assets/default-avatar.png"
    };

    this.caricaAvvistamenti();
  }

  caricaAvvistamenti() {
    this.avvService.getByUser(this.userId).subscribe(res => {
      this.avvistamenti = res;
    });
  }

  vaiADettaglio(id: number) {
    this.router.navigate(['/gatto', id]);
  }
}
