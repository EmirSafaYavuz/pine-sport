import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchService } from '../../../../core/services/branch.service';
import { SchoolService } from '../../../../core/services/school.service';
import { GenericFormComponent } from '../../../../core/components/generic-form/generic-form.component';
import { ToastrService } from 'ngx-toastr';
import { BRANCH_FORM_FIELDS } from '../../models/branch-form.model';

@Component({
  selector: 'app-branch-register',
  standalone: true,
  imports: [CommonModule, GenericFormComponent],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Yeni Şube Ekle</h1>
        <button
          (click)="navigateBack()"
          class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 transition-colors text-sm">
          Geri Dön
        </button>
      </div>
      <div class="bg-gray-50 rounded-lg p-6">
        <app-generic-form
          [form]="branchForm"
          [fields]="formFields"
          (formSubmit)="onSubmit()"
        ></app-generic-form>
      </div>
    </div>
  `
})
export class BranchRegisterComponent implements OnInit {
  branchForm: FormGroup;
  formFields = BRANCH_FORM_FIELDS;

  constructor(
    private fb: FormBuilder,
    private branchService: BranchService,
    private schoolService: SchoolService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.branchForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobilePhone: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: [null, Validators.required],
      address: ['', Validators.required],
      notes: [''],
      branchName: ['', Validators.required],
      branchAddress: ['', Validators.required],
      branchPhone: ['', Validators.required],
      schoolId: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.loadSchools();
  }

  loadSchools() {
    this.schoolService.getSchools().subscribe({
      next: (schools) => {
        const schoolOptions = schools.map(school => ({
          value: school.id,
          label: school.name
        }));
        const schoolField = this.formFields.find(f => f.name === 'schoolId');
        if (schoolField) {
          schoolField.options = schoolOptions;
        }
      },
      error: (error) => {
        this.toastr.error('Okullar yüklenirken bir hata oluştu');
      }
    });
  }

  onSubmit() {
    if (this.branchForm.valid) {
      this.branchService.registerBranch(this.branchForm.value).subscribe({
        next: () => {
          this.toastr.success('Şube başarıyla eklendi');
          this.router.navigate(['/branches']);
        },
        error: (error) => {
          this.toastr.error(error.error?.message || 'Bir hata oluştu');
        }
      });
    }
  }

  navigateBack() {
    this.router.navigate(['/branches']);
  }
}
