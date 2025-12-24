import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cause } from '../../models/cause.model';

@Component({
  selector: 'app-cause-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cause-details.component.html',
  styleUrls: ['./cause-details.component.scss']
})
export class CauseDetailsComponent implements OnInit {
  cause: Cause | undefined;

  // Mock data - in a real app, this would come from a service
  causes: Cause[] = [
    {
      id: 'digital-education',
      title: 'Digital Education for Rural Children',
      shortDescription: 'Bridging the digital divide by providing tablets and internet access to rural schools.',
      detailedDescription: 'Our Digital Education initiative aims to equip rural children with essential digital skills. By providing tablets, internet connectivity, and interactive learning software, we ensure that no child is left behind in the digital age. This program includes teacher training and curriculum development tailored to rural needs.',
      image: 'assets/images/causes/digital-education.jpg',
      category: 'Education',
      impactStats: {
        beneficiaries: 2500,
        fundsRaised: 75000,
        goal: 100000,
        volunteers: 50
      }
    },
    {
      id: 'emergency-medical-aid',
      title: 'Emergency Medical Aid for Low-Income Families',
      shortDescription: 'Providing critical medical care and emergency response to underserved communities.',
      detailedDescription: 'The Emergency Medical Aid program delivers immediate healthcare support to low-income families facing medical emergencies. We partner with local clinics to provide subsidized treatments, emergency transportation, and preventive care programs that address the root causes of health disparities.',
      image: 'assets/images/causes/emergency-medical.jpg',
      category: 'Healthcare',
      impactStats: {
        beneficiaries: 1800,
        fundsRaised: 120000,
        goal: 150000,
        volunteers: 75
      }
    },
    {
      id: 'zero-hunger-kitchens',
      title: 'Zero Hunger Community Kitchens',
      shortDescription: 'Establishing sustainable community kitchens to combat food insecurity.',
      detailedDescription: 'Zero Hunger Community Kitchens create local food hubs that provide nutritious meals while teaching sustainable farming and cooking skills. These kitchens serve as community centers where families learn to grow their own food and prepare healthy meals, breaking the cycle of hunger.',
      image: 'assets/images/causes/community-kitchens.jpg',
      category: 'Food Security',
      impactStats: {
        beneficiaries: 3200,
        fundsRaised: 85000,
        goal: 110000,
        volunteers: 120
      }
    },
    {
      id: 'climate-action-tree-plantation',
      title: 'Climate Action & Tree Plantation Drives',
      shortDescription: 'Large-scale reforestation efforts to combat climate change and restore ecosystems.',
      detailedDescription: 'Our Climate Action program focuses on planting millions of trees across degraded landscapes. We work with local communities to restore biodiversity, prevent soil erosion, and create carbon sinks. Each plantation drive includes education on climate resilience and sustainable land management.',
      image: 'assets/images/causes/tree-plantation.jpg',
      category: 'Environment',
      impactStats: {
        beneficiaries: 50000,
        fundsRaised: 200000,
        goal: 300000,
        volunteers: 200
      }
    },
    {
      id: 'women-skill-development',
      title: 'Women Skill Development & Employment',
      shortDescription: 'Empowering women through vocational training and entrepreneurship programs.',
      detailedDescription: 'Our Women Skill Development program provides comprehensive training in various trades and entrepreneurship. We offer skill-building workshops, mentorship programs, and micro-financing opportunities to help women achieve economic independence and leadership roles in their communities.',
      image: 'assets/images/causes/women-empowerment.jpg',
      category: 'Empowerment',
      impactStats: {
        beneficiaries: 1500,
        fundsRaised: 95000,
        goal: 125000,
        volunteers: 80
      }
    },
    {
      id: 'disaster-relief-rehab',
      title: 'Disaster Relief & Rehabilitation Programs',
      shortDescription: 'Comprehensive support for communities affected by natural disasters.',
      detailedDescription: 'Our Disaster Relief program provides immediate emergency response followed by long-term rehabilitation. We deliver essential supplies, temporary shelter, medical care, and community rebuilding support to help affected populations recover and build resilience against future disasters.',
      image: 'assets/images/causes/disaster-relief.jpg',
      category: 'Relief',
      impactStats: {
        beneficiaries: 8000,
        fundsRaised: 350000,
        goal: 500000,
        volunteers: 300
      }
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cause = this.causes.find(c => c.id === id);
    }
  }

  donate(): void {
    this.router.navigate(['/donate']);
  }
}
