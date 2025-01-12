import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService} from '../../auth/services/auth.service';
import { ProfileService } from '../services/profile.service';
import { OrderDTOModel } from '../../merch/shared/models/order.dto.model';

@Component({
  selector: 'app-page-profil',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './page-profil.component.html',
  styleUrl: './page-profil.component.css'
})
export class PageProfilComponent implements OnInit {
  fidelityPoints: number | null = null;
  orders: OrderDTOModel[] = [];

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit()
  {
    this.getFidelityPoints();
    this.getUserOrders();
  }

    private getFidelityPoints() {
    // 1) Decode l'user ID depuis le JWT Token
    const userId = this.authService.getCurrentUserId();

    // 2) Si valid ID, alors on fetch les fidelity points
    if (userId) {
      this.profileService.getFidelityPoints(userId).subscribe({
        next: (points) => {
          this.fidelityPoints = points;
        },
        error: (err) => {
          console.error('Error fetching fidelity points', err);
        }
      });
    } else {
      console.error('User ID could not be retrieved from token.');
    }
  }

  private getUserOrders() {
    // 1) Decode l'user Email depuis le JWT Token
    const userEmail = this.authService.getCurrentUserEmail();

    // 2) Si valid Email, alors on fetch les fidelity points
    if (userEmail) {
      this.profileService.getUserOrders(userEmail).subscribe({
        next: (orders) => {
          this.orders = orders;
        },
        error: (err) => {
          console.error('Error fetching fidelity points', err);
        }
      });
    } else {
      console.error('User ID could not be retrieved from token.');
    }
  }
}
