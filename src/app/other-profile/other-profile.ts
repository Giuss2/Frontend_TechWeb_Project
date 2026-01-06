import { Component, OnInit } from '@angular/core';
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

  constructor(
    private router: Router,
    private avvService: AvvistamentiService,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

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

  vaiADettaglio(id: number) {
    this.router.navigate(['/cat', id]);
  }

  backToMap(){
    this.router.navigate(['/homepage']);
  }
}
