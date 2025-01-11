import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BranchService } from '../../../../core/services/branch.service';
import { SchoolService } from '../../../../core/services/school.service';
import { School } from '../../../../core/models/school.model';

@Component({
  selector: 'app-branch-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './branch-register.component.html',
  styleUrls: ['./branch-register.component.css']
})
export class BranchRegisterComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() branchAdded = new EventEmitter<void>();

  branchForm: FormGroup;
  schools: School[] = [];

  constructor(
    private fb: FormBuilder,
    private branchService: BranchService,
    private schoolService: SchoolService,
    private toastr: ToastrService
  ) {
    this.branchForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobilePhone: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      gender: [null, [Validators.required]],
      address: ['', [Validators.required]],
      notes: [''],
      password: ['', [Validators.required]],
      branchName: ['', [Validators.required]],
      branchAddress: ['', [Validators.required]],
      branchPhone: ['', [Validators.required]],
      schoolId: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getSchools();
  }

  getSchools() {
    this.schoolService.getSchools().subscribe({
      next: (response) => {
        this.schools = response;
      },
      error: (error) => {
        this.toastr.error('Okullar yüklenirken bir hata oluştu', 'Hata');
        console.error('Failed to load schools:', error);
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.branchForm.get(controlName);
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;
    const errorMessages: { [key: string]: string } = {
      required: 'Bu alan zorunludur',
      email: 'Geçerli bir e-posta adresi giriniz',
      minlength: 'Bu alan minimum 6 karakter olmalıdır',
      pattern: 'Geçersiz format'
    };

    // Return first error message
    const firstError = Object.keys(errors)[0];
    return errorMessages[firstError] || 'Geçersiz değer';
  }

  isFieldValid(controlName: string): boolean {
    const control = this.branchForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  onSubmit() {
    if (this.branchForm.valid) {
      this.branchService.registerBranch(this.branchForm.value).subscribe({
        next: (response) => {
          this.toastr.success('Şube başarıyla eklendi', 'Başarılı');
          this.close();
          this.branchForm.reset();
          this.branchAdded.emit();
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'Şube eklenirken bir hata oluştu';
          this.toastr.error(errorMessage, 'Hata');
          console.error('Branch creation failed:', error);
        }
      });
    } else {
      Object.keys(this.branchForm.controls).forEach(key => {
        const control = this.branchForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
          this.toastr.warning(`${key}: ${this.getErrorMessage(key)}`, 'Form Hatası');
        }
      });
    }
  }

  close() {
    this.closeModal.emit();
  }
}
