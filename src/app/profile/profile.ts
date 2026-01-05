import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth-service';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { CommonModule } from '@angular/common';
import { BackendService } from '../services/rest-backend/backend-service';

@Component({
  selector: 'app-profilo',
  standalone: true,
  templateUrl: "./profile.html",
  styleUrls: ['./profile.scss'],
  imports: [HttpClientModule, CommonModule]
})

export class ProfiloComponent implements OnInit {

  user: any; 
  avvistamenti: any[] = [];

  constructor(
    private auth: AuthService,
    private avvService: AvvistamentiService,
    private router: Router,
    private backend: BackendService
  ) {}

  ngOnInit() {
    this.user = this.auth.user; // recupera user da JWT (O BACKEND)
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.caricaAvvistamentiUtente();
  }
  
  
  caricaAvvistamentiUtente() {
  this.avvService.getByUser(this.user.id)
    .subscribe({
      next: res => {
        //console.log("Avvistamenti ricevuti:", res);
        this.avvistamenti = res;
      },
      error: err => {
        console.error("Errore nel caricamento avvistamenti:", err);
      }
    });
}

createAvvistamento(){
  this.router.navigate(['/create-avvistamento']);
}


  vaiADettaglio(id: number) {
    this.router.navigate(['/cat', id]);
  }

  apriProfiloUtente(event: any) {
    this.vaiADettaglio(event.id);
  }

  backToMap(){
    this.router.navigate(['/homepage']);
  }
}
