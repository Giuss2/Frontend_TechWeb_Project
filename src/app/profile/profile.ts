import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from '../map/map';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth-service';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';

@Component({
  selector: 'app-profilo',
  standalone: true,
  templateUrl: "./profile.html",
  styleUrls: ['./profile.scss'],
  imports: [HttpClientModule, MapComponent]
})

export class ProfiloComponent implements OnInit {

  user: any; 
  avvistamenti: any[] = [];

  constructor(
    private auth: AuthService,
    private avvService: AvvistamentiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.auth.getUser(); // recupera user da JWT o backend
    this.caricaAvvistamentiUtente();
  }
  
  
  caricaAvvistamentiUtente() {
  this.avvService.getByUser(this.user.id)
    .subscribe({
      next: res => {
        console.log("Avvistamenti ricevuti:", res);
        this.avvistamenti = res;
      },
      error: err => {
        console.error("Errore nel caricamento avvistamenti:", err);
      }
    });
}


  vaiADettaglio(id: number) {
    this.router.navigate(['/gatto', id]);
  }

  apriProfiloUtente(event: any) {
    this.vaiADettaglio(event.id);
  }
}
