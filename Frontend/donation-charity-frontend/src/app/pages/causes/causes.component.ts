import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CauseCardComponent } from '../../components/cause-card/cause-card.component';
import { Cause } from '../../models/cause.model';

@Component({
  selector: 'app-causes',
  standalone: true,
  imports: [CommonModule, CauseCardComponent],
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.scss']
})
export class CausesComponent {
  causes = [
    {
      title: 'Education',
      description: 'Support education initiatives for underprivileged children. Help build schools, provide textbooks, and fund scholarships to ensure every child has access to quality education.',
      icon: 'fas fa-graduation-cap',
      goal: 50000,
      raised: 32000,
      donors: 150
    },
    {
      title: 'Healthcare',
      description: 'Provide medical assistance and healthcare services to communities in need. Support hospitals, medical supplies, and healthcare programs for vulnerable populations.',
      icon: 'fas fa-heartbeat',
      goal: 75000,
      raised: 45000,
      donors: 200
    },
    {
      title: 'Food & Hunger',
      description: 'Help fight hunger by providing food to communities in need. Support food banks, meal programs, and initiatives to combat food insecurity worldwide.',
      icon: 'fas fa-utensils',
      goal: 30000,
      raised: 18000,
      donors: 120
    },
    {
      title: 'Disaster Relief',
      description: 'Aid disaster-affected families with urgent support. Provide emergency supplies, shelter, and recovery assistance to those impacted by natural disasters.',
      icon: 'fas fa-hands-helping',
      goal: 100000,
      raised: 65000,
      donors: 300
    },
    {
      title: 'Clean Water',
      description: 'Ensure access to clean and safe drinking water. Support water purification projects, well drilling, and sanitation initiatives in underserved communities.',
      icon: 'fas fa-tint',
      goal: 40000,
      raised: 25000,
      donors: 180
    },
    {
      title: 'Animal Welfare',
      description: 'Protect and care for animals in need. Support animal shelters, veterinary care, and wildlife conservation efforts to improve animal welfare globally.',
      icon: 'fas fa-paw',
      goal: 25000,
      raised: 15000,
      donors: 90
    }
  ];
}
