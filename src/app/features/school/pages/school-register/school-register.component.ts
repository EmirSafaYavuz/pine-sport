import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SchoolService } from '../../../../core/services/school.service';
import { GenericFormComponent } from '../../../../core/components/generic-form/generic-form.component';
import { ToastrService } from 'ngx-toastr';
import { SCHOOL_FORM_FIELDS } from '../../models/school-form.model';
import { ErrorResponse } from '../../../../core/models/error-response.model';
import { SchoolRegister } from '../../../../core/models/school-register.model';

@Component({
  selector: 'app-school-register',
  standalone: true,
  imports: [CommonModule, GenericFormComponent],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Yeni Okul Ekle</h1>
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
          [form]="schoolForm"
          [fields]="formFields"
          (formSubmit)="onSubmit()"
        ></app-generic-form>
      </div>
    </div>
  `
})
export class SchoolRegisterComponent {
  @ViewChild('formComponent') formComponent!: GenericFormComponent;
  schoolForm: FormGroup;
  formFields = SCHOOL_FORM_FIELDS;

  constructor(
    private fb: FormBuilder,
    private schoolService: SchoolService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.schoolForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      managerName: ['', Validators.required],
      managerPhone: ['', Validators.required],
      managerEmail: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.schoolForm.valid) {
      const formValues = this.schoolForm.value;
      const schoolRegisterData: SchoolRegister = {
        fullName: formValues.managerName,
        email: formValues.managerEmail,
        mobilePhone: formValues.managerPhone,
        birthDate: new Date().toISOString(), // You might want to add this to the form
        gender: 0, // You might want to add this to the form
        address: formValues.address,
        notes: 'This is a random test data.', // You might want to add this to the form
        password: 'DefaultPassword123!', // You might want to add this to the form or generate it
        schoolName: formValues.name,
        schoolAddress: formValues.address,
        schoolPhone: formValues.phone
      };

      this.schoolService.registerSchool(schoolRegisterData).subscribe({
        next: (response) => {
          this.toastr.success('Okul başarıyla eklendi');
          this.router.navigate(['/schools']);
        },
        error: (error: ErrorResponse) => {
          console.error('Error response:', error);
          if (error.errors) {
            Object.values(error.errors).flat().forEach(message => {
              this.toastr.error(message);
            });
          } else {
            this.toastr.error(error.message);
          }
          this.formComponent.resetSubmitting();
        },
        complete: () => {
          this.formComponent.resetSubmitting();
        }
      });
    }
  }

  fillTestData() {
    const randomNumber = Math.floor(Math.random() * 1000);
    const testData = {
      name: `Test Okulu ${randomNumber}`,
      address: `Test Mahallesi ${randomNumber}, Test Sokak No:${randomNumber}`,
      phone: `05${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
      managerName: `Test Müdür ${randomNumber}`,
      managerPhone: `05${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
      managerEmail: `testmudur${randomNumber}@test.com`
    };

    this.schoolForm.patchValue(testData);
  }

  navigateBack() {
    this.router.navigate(['/schools']);
  }
}
