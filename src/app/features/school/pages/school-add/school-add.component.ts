import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolService } from '../../../../core/services/school.service';
import { GenericFormComponent } from '../../../../core/components/generic-form/generic-form.component';
import { ToastrService } from 'ngx-toastr';
import { SCHOOL_FORM_FIELDS } from '../../models/school-form.model';

@Component({
  selector: 'app-school-add',
  standalone: true,
  imports: [CommonModule, GenericFormComponent],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Yeni Okul Ekle</h1>
        <button (click)="navigateBack()" class="btn-secondary">Geri Dön</button>
      </div>
      <div class="bg-white rounded-lg shadow-md p-6">
        <app-generic-form
          [form]="schoolForm"
          [fields]="formFields"
          (formSubmit)="onSubmit()"
        ></app-generic-form>
      </div>
    </div>
  `
})
export class SchoolAddComponent {
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
      this.schoolService.register(this.schoolForm.value).subscribe({
        next: () => {
          this.toastr.success('Okul başarıyla eklendi');
          this.router.navigate(['/schools']);
        },
        error: (error) => {
          this.toastr.error(error.error?.message || 'Bir hata oluştu');
        }
      });
    }
  }

  navigateBack() {
    this.router.navigate(['/schools']);
  }
}
