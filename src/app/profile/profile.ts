import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth-service';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service/user-service';

@Component({
  selector: 'app-profilo',
  standalone: true,
  templateUrl: "./profile.html",
  styleUrls: ['./profile.scss'],
  imports: [CommonModule]
})

export class ProfiloComponent implements OnInit {

  user: any; 
  avvistamenti: any[] = [];

  
  private router = inject(Router);
  private auth = inject(AuthService);
  private avvService= inject(AvvistamentiService);
  private userService= inject(UserService);


  ngOnInit() {
  const authUser = this.auth.user;

  if (!authUser) {
    this.router.navigate(['/login']);
    return;
  }

  this.caricaProfilo(authUser.id);
  this.caricaAvvistamentiUtente(authUser.id);
}

caricaProfilo(userId: number) {
  this.userService.getUserProfile(userId).subscribe({
    next: user => {
      this.user = user;
    },
    error: err => {
      console.error('Errore caricamento profilo', err);
    }
  });
}
  
  
  caricaAvvistamentiUtente(userId: number) {
  this.avvService.getByUser(userId).subscribe({
    next: res => {
      this.avvistamenti = res;
    },
    error: err => {
      console.error("Errore nel caricamento avvistamenti:", err);
    }
  });
}


getFotoUrl(foto: string): string {
  // Se non c'è nessuna immagine, usa quella di default
  if (!foto) {
    return 'assets/cats_imgs/gatto_default.jpg';
  }

  // Altrimenti, usa sempre il file locale salvato
  return `assets/cats_imgs/${foto}`;
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

  deleteAvvistamento(id: number) {
  if (!confirm("Sei sicuro di voler eliminare questo avvistamento?")) {
    return;
  }

  this.avvService.delete(id).subscribe({
    next: () => {
      // Rimuovi l'avvistamento dalla lista senza ricaricare tutto
      this.avvistamenti = this.avvistamenti.filter(a => a.id !== id);
      console.log(`Avvistamento ${id} eliminato`);
    },
    error: (err) => {
      console.error("Errore eliminazione avvistamento:", err);
      alert("Impossibile eliminare l'avvistamento.");
    }
  });
}

}
