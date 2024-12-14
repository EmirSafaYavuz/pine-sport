import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-school-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './school-add.component.html',
  styleUrls: ['./school-add.component.css']
})
export class SchoolAddComponent implements OnInit {
  schoolForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.schoolForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.schoolForm.valid) {
      console.log(this.schoolForm.value);
      // Implement your save logic here
    }
  }
}
