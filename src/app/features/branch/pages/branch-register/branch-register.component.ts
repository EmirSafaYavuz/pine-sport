import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchService } from '../../../../core/services/branch.service';
import { SchoolService } from '../../../../core/services/school.service';
import { GenericFormComponent } from '../../../../core/components/generic-form/generic-form.component';
import { ToastrService } from 'ngx-toastr';
import { BRANCH_FORM_FIELDS } from '../../models/branch-form.model';
import { ErrorResponse } from '../../../../core/models/error-response.model';

@Component({
  selector: 'app-branch-register',
  standalone: true,
  imports: [CommonModule, GenericFormComponent],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Yeni Şube Ekle</h1>
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
          [form]="branchForm"
          [fields]="formFields"
          (formSubmit)="onSubmit()"
        ></app-generic-form>
      </div>
    </div>
  `
})
export class BranchRegisterComponent implements OnInit {
  @ViewChild('formComponent') formComponent!: GenericFormComponent;
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

  fillTestData() {
    const randomNumber = Math.floor(Math.random() * 1000);
    const testData = {
      fullName: `Test Yönetici ${randomNumber}`,
      email: `testyonetici${randomNumber}@test.com`,
      password: 'Test123!',
      mobilePhone: `05${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
      birthDate: new Date().toISOString().split('T')[0],
      gender: Math.random() > 0.5 ? 1 : 2, // 1: Erkek, 2: Kadın
      address: `Test Mahallesi ${randomNumber}, Test Sokak No:${randomNumber}`,
      notes: 'Test notları',
      branchName: `Test Şubesi ${randomNumber}`,
      branchAddress: `Test Şube Mahallesi ${randomNumber}, Test Sokak No:${randomNumber}`,
      branchPhone: `05${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
      schoolId: null // Bu değer loadSchools() çağrısından sonra mevcut okullardan biriyle doldurulabilir
    };

    this.branchForm.patchValue(testData);
  }

  onSubmit() {
    if (this.branchForm.valid) {
      this.branchService.registerBranch(this.branchForm.value).subscribe({
        next: () => {
          this.toastr.success('Şube başarıyla eklendi');
          this.router.navigate(['/branches']);
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

  navigateBack() {
    this.router.navigate(['/branches']);
  }
}
