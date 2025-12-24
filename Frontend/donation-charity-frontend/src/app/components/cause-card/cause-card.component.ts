import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cause-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cause-card.component.html',
  styleUrl: './cause-card.component.scss'
})
export class CauseCardComponent {
  @Input() cause: any;
}
