import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrainerService } from '../../../../core/services/trainer.service';
import { GenericFormComponent } from '../../../../core/components/generic-form/generic-form.component';
import { TRAINER_FORM_FIELDS } from '../../models/trainer-form.model';
import { ErrorResponse } from '../../../../core/models/error-response.model';
import { Gender } from '../../../../core/models/gender.model';

@Component({
  selector: 'app-trainer-register',
  standalone: true,
  imports: [CommonModule, GenericFormComponent],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Yeni Eğitmen Ekle</h1>
        <div class="space-x-2">
          <button
            (click)="fillTestData()"
            class="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-colors text-sm">
            Test Verisi Doldur
          </button>
          <button
            (click)="navigateBack()"
            class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 transition-colors text-sm">
            Geri Dön
          </button>
        </div>
      </div>
      <div class="bg-gray-50 rounded-lg p-6">
        <app-generic-form
          #formComponent
          [form]="trainerForm"
          [fields]="formFields"
          (formSubmit)="onSubmit()"
        ></app-generic-form>
      </div>
    </div>
  `
})
export class TrainerRegisterComponent {
  @ViewChild('formComponent') formComponent!: GenericFormComponent;
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
      gender: [null, Validators.required],  // null olarak başlat
      specialization: ['', Validators.required],
      address: ['', Validators.required],
      notes: ['']
    });
  }

  fillTestData() {
    const randomNumber = Math.floor(Math.random() * 1000);
    const testData = {
      fullName: `Test Eğitmen ${randomNumber}`,
      email: `testegitmen${randomNumber}@test.com`,
      password: 'Test123!',
      mobilePhone: `05${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
      birthDate: new Date().toISOString().split('T')[0],
      gender: Math.random() > 0.5 ? 1 : 2,
      specialization: `Test Uzmanlık ${randomNumber}`,
      address: `Test Mahallesi ${randomNumber}, Test Sokak No:${randomNumber}`,
      notes: 'Test notları'
    };

    this.trainerForm.patchValue(testData);
  }

  onSubmit() {
    if (this.trainerForm.valid) {
      const formData = this.trainerForm.value;

      // Gender enum dönüşümü
      formData.gender = Number(formData.gender) === 1 ? Gender.Male : Gender.Female;

      console.log('Gönderilen veri:', formData); // Debug için

      this.trainerService.registerTrainer(formData).subscribe({
        next: () => {
          this.toastr.success('Eğitmen başarıyla eklendi');
          this.router.navigate(['/trainers']);
        },
        error: (error: ErrorResponse) => {
          console.error('Error response:', error);
          if (error.errors) {
            Object.values(error.errors).flat().forEach(message => {
              this.toastr.error(message);
            });
          } else {
            this.toastr.error(error.message || 'Bir hata oluştu');
          }
          this.formComponent.resetSubmitting();
        },
        complete: () => {
          this.formComponent.resetSubmitting();
        }
      });
    }
  }

  navigateBack() {
    this.router.navigate(['/trainers']);
  }
}
