import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.scss'
})
export class DonateComponent {
  donationForm = {
    amount: '',
    customAmount: '',
    name: '',
    email: '',
    cause: '',
    anonymous: false,
    recurring: false
  };

  presetAmounts = [25, 50, 100, 250, 500];

  causes = [
    'Education',
    'Healthcare',
    'Food & Hunger',
    'Disaster Relief',
    'Clean Water',
    'Animal Welfare'
  ];

  selectAmount(amount: number) {
    this.donationForm.amount = amount.toString();
    this.donationForm.customAmount = '';
  }

  onCustomAmountChange() {
    this.donationForm.amount = this.donationForm.customAmount;
  }

  onSubmit() {
    // Mock submission - in real app, this would send to backend
    console.log('Donation submitted:', this.donationForm);
    alert('Thank you for your donation! This is a mock submission.');
    this.resetForm();
  }

  private resetForm() {
    this.donationForm = {
      amount: '',
      customAmount: '',
      name: '',
      email: '',
      cause: '',
      anonymous: false,
      recurring: false
    };
  }
}
