import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SchoolService } from '../../../../core/services/school.service';
import { SchoolRegister } from '../../../../core/models/school-register.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-school-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './school-add.component.html',
  styleUrls: ['./school-add.component.css']
})
export class SchoolAddComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() schoolAdded = new EventEmitter<void>();

  schoolForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private schoolService: SchoolService,
    private toastr: ToastrService
  ) {
    this.schoolForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobilePhone: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      gender: [0, [Validators.required]],
      address: ['', [Validators.required]],
      notes: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      schoolName: ['', [Validators.required]],
      schoolAddress: ['', [Validators.required]],
      schoolPhone: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.schoolForm.valid) {
      this.schoolService.register(this.schoolForm.value).subscribe({
        next: (response) => {
          this.toastr.success('Okul başarıyla eklendi', 'Başarılı');
          this.close();
          this.schoolForm.reset();
          this.schoolAdded.emit();
        },
        error: (error) => {
          // API'den gelen hata mesajını göster
          const errorMessage = error.error?.message || 'Okul eklenirken bir hata oluştu';
          this.toastr.error(errorMessage, 'Hata');
          console.error('Registration failed:', error);
        }
      });
    } else {
      this.toastr.warning('Lütfen tüm gerekli alanları doldurun', 'Uyarı');
    }
  }

  fillSampleData() {
    this.schoolForm.patchValue({
      fullName: 'Ahmet Yılmaz',
      email: 'ahmet.yilmaz@example.com',
      mobilePhone: '5551234567',
      birthDate: '1980-01-01',
      gender: 0,
      address: 'Atatürk Cad. No:123 Çankaya/Ankara',
      notes: 'Örnek not',
      password: 'test123456',
      schoolName: 'Cumhuriyet İlköğretim Okulu',
      schoolAddress: 'Cumhuriyet Mah. Okul Sok. No:1 Çankaya/Ankara',
      schoolPhone: '3121234567'
    });
  }

  close() {
    this.closeModal.emit();
  }
}
