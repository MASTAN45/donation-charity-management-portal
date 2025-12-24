import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CauseCardComponent } from '../../components/cause-card/cause-card.component';
import { Cause } from '../../models/cause.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CauseCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  causes = [
    {
      title: 'Education',
      description: 'Providing quality education to underprivileged children.',
      icon: 'fas fa-graduation-cap'
    },
    {
      title: 'Healthcare',
      description: 'Improving healthcare facilities in remote areas.',
      icon: 'fas fa-heartbeat'
    },
    {
      title: 'Food & Hunger',
      description: 'Fighting hunger and providing nutritious meals.',
      icon: 'fas fa-utensils'
    },
    {
      title: 'Disaster Relief',
      description: 'Supporting communities affected by natural disasters.',
      icon: 'fas fa-house-damage'
    }
  ];

  testimonials = [
    {
      name: 'Shaik Kalesha',
      message: 'Being part of this charity has been truly fulfilling. It gives me confidence knowing my contributions are creating meaningful change.',
      image: 'assets/images/donors/shaik-kalesha.jpg'
    },
    {
      name: 'Manohar',
      message: 'This platform makes donating simple and transparent. I feel proud to support causes that genuinely help communities grow.',
      image: 'assets/images/donors/manu.jpg'
    },
    {
      name: 'Lokesh',
      message: 'Seeing how small contributions can create a big impact motivates me to continue supporting these initiatives.',
      image: 'assets/images/donors/Lokesh.png'
    },
    {
      name: 'Subba Reddy',
      message: 'Supporting this charity has been a rewarding experience. It’s inspiring to see real change driven by collective effort.',
      image: 'assets/images/donors/Subba.jpg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
