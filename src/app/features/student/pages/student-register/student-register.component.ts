import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../../../core/services/student.service';
import { BranchService } from '../../../../core/services/branch.service';
import { ParentService } from '../../../../core/services/parent.service';
import { GenericFormComponent } from '../../../../core/components/generic-form/generic-form.component';
import { ToastrService } from 'ngx-toastr';
import { STUDENT_FORM_FIELDS } from '../../models/student-form.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-student-register',
  standalone: true,
  imports: [CommonModule, GenericFormComponent],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Yeni Öğrenci Ekle</h1>
        <button
          (click)="navigateBack()"
          class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 transition-colors text-sm">
          Geri Dön
        </button>
      </div>
      <div class="bg-gray-50 rounded-lg p-6">
        <app-generic-form
          [form]="studentForm"
          [fields]="formFields"
          (formSubmit)="onSubmit()"
        ></app-generic-form>
      </div>
    </div>
  `
})
export class StudentRegisterComponent implements OnInit {
  studentForm: FormGroup;
  formFields = STUDENT_FORM_FIELDS;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private branchService: BranchService,
    private parentService: ParentService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.studentForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobilePhone: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      notes: [''],
      password: ['', Validators.required],
      branchId: ['', Validators.required],
      parentId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadFormData();
  }

  loadFormData() {
    forkJoin({
      branches: this.branchService.getBranches(),
      parents: this.parentService.getParents()
    }).subscribe({
      next: (result) => {
        const branchField = this.formFields.find(f => f.name === 'branchId');
        const parentField = this.formFields.find(f => f.name === 'parentId');

        if (branchField) {
          branchField.options = result.branches.map(b => ({
            value: b.id,
            label: b.name
          }));
        }

        if (parentField) {
          parentField.options = result.parents.map(p => ({
            value: p.id,
            label: `${p.name} ${p.surname}`
          }));
        }
      },
      error: (error) => {
        this.toastr.error('Form verileri yüklenirken hata oluştu');
        console.error('Error loading form data:', error);
      }
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.studentService.registerStudent(this.studentForm.value).subscribe({
        next: () => {
          this.toastr.success('Öğrenci başarıyla eklendi');
          this.router.navigate(['/students']);
        },
        error: (error) => {
          this.toastr.error(error.error?.message || 'Bir hata oluştu');
        }
      });
    }
  }

  navigateBack() {
    this.router.navigate(['/students']);
  }
}
