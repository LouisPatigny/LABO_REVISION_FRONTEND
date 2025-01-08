import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../services/profile.service';

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

  constructor(private route: ActivatedRoute, private profileService: ProfileService) {}

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];

    this.profileService.getFidelityPoints(userId).subscribe(
      (points) => (this.fidelityPoints = points)
    );
  }
}
