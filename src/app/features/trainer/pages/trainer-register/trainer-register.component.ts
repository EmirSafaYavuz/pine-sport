import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrainerService } from '../../../../core/services/trainer.service';
import { GenericFormComponent } from '../../../../core/components/generic-form/generic-form.component';
import { TRAINER_FORM_FIELDS } from '../../models/trainer-form.model';

@Component({
  selector: 'app-trainer-register',
  standalone: true,
  imports: [CommonModule, GenericFormComponent],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Yeni Eğitmen Ekle</h1>
        <button
          (click)="navigateBack()"
          class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 transition-colors text-sm">
          Geri Dön
        </button>
      </div>
      <div class="bg-gray-50 rounded-lg p-6">
        <app-generic-form
          [form]="trainerForm"
          [fields]="formFields"
          (formSubmit)="onSubmit()"
        ></app-generic-form>
      </div>
    </div>
  `
})
export class TrainerRegisterComponent {
  trainerForm: FormGroup;
  formFields = TRAINER_FORM_FIELDS;

  constructor(
    private fb: FormBuilder,
    private trainerService: TrainerService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.trainerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobilePhone: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      specialization: ['', Validators.required],
      address: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.trainerForm.valid) {
      this.trainerService.registerTrainer(this.trainerForm.value).subscribe({
        next: () => {
          this.toastr.success('Eğitmen başarıyla eklendi');
          this.router.navigate(['/trainers']);
        },
        error: (error) => {
          this.toastr.error(error.error?.message || 'Bir hata oluştu');
        }
      });
    }
  }

  navigateBack() {
    this.router.navigate(['/trainers']);
  }
}
