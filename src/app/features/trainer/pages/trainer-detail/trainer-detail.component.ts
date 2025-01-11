import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Trainer } from '../../../../core/models/trainer.model';

@Component({
  selector: 'app-trainer-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainer-detail.component.html',
  styleUrl: './trainer-detail.component.css'
})
export class TrainerDetailComponent implements OnInit {
  trainer: Trainer | null = null;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Simulating API call
    this.loading = true;
    setTimeout(() => {
      this.trainer = {
        id: 1,
        fullName: 'John Doe',
        email: 'john@example.com',
        mobilePhone: '+90 555 123 4567',
        birthDate: '1990-01-01',
        gender: 'Male',
        specialization: 'Fitness Training'
      };
      this.loading = false;
    }, 1000);
  }
}
