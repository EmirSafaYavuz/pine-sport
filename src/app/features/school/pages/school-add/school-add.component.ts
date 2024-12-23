import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SchoolService } from '../../../../core/services/school.service';

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
    private schoolService: SchoolService
  ) {
    this.schoolForm = this.fb.group({
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      studentCount: [0, [Validators.required, Validators.min(0)]],
      established: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.schoolForm.valid) {
      //this.schoolService.addSchool(this.schoolForm.value);
      this.schoolForm.reset();
      this.schoolAdded.emit();
    }
  }

  close() {
    this.closeModal.emit();
  }
}
