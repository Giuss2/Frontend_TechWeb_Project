import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service/user-service';

@Component({
  selector: 'other-profile',
  standalone: true,
  templateUrl: './other-profile.html',
  styleUrls: ['./other-profile.scss'],
  imports: [CommonModule]
})
export class OtherProfile implements OnInit {

  userId!: number;
  avvistamenti: any[] = [];
  user: any = null;
  error= '';
  loading: boolean = true;

  private route = inject(ActivatedRoute); 
  private router = inject(Router);
  private avvService= inject(AvvistamentiService);
  private userService= inject(UserService);


    ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.caricaProfilo();
    this.caricaAvvistamenti();
  }

  caricaProfilo() {
    this.userService.getUserProfile(this.userId).subscribe({
      next: user => this.user = user,
      error: () => this.error = 'Utente non trovato'
    });
  }

  caricaAvvistamenti() {
    this.avvService.getByUser(this.userId).subscribe({
      next: res => {
        this.avvistamenti = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Errore nel caricamento';
        this.loading = false;
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



  vaiADettaglio(id: number) {
    this.router.navigate(['/cat', id]);
  }

  backToMap(){
    this.router.navigate(['/homepage']);
  }
}
