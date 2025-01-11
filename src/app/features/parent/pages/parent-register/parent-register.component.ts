import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParentService } from '../../../../core/services/parent.service';
import { GenericFormComponent } from '../../../../core/components/generic-form/generic-form.component';
import { ToastrService } from 'ngx-toastr';
import { PARENT_FORM_FIELDS } from '../../models/parent-form.model';

@Component({
  selector: 'app-parent-register',
  standalone: true,
  imports: [CommonModule, GenericFormComponent],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Yeni Veli Ekle</h1>
        <button
          (click)="navigateBack()"
          class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 transition-colors text-sm">
          Geri Dön
        </button>
      </div>
      <div class="bg-gray-50 rounded-lg p-6">
        <app-generic-form
          [form]="parentForm"
          [fields]="formFields"
          (formSubmit)="onSubmit()"
        ></app-generic-form>
      </div>
    </div>
  `
})
export class ParentRegisterComponent {
  parentForm: FormGroup;
  formFields = PARENT_FORM_FIELDS;

  constructor(
    private fb: FormBuilder,
    private parentService: ParentService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.parentForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobilePhone: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      notes: [''],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.parentForm.valid) {
      this.parentService.registerParent(this.parentForm.value).subscribe({
        next: () => {
          this.toastr.success('Veli başarıyla eklendi');
          this.router.navigate(['/parents']);
        },
        error: (error) => {
          this.toastr.error(error.error?.message || 'Bir hata oluştu');
        }
      });
    }
  }

  navigateBack() {
    this.router.navigate(['/parents']);
  }
}
