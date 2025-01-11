import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '../../models/form-field.model';

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './generic-form.component.html'
})
export class GenericFormComponent {
  @Input() form!: FormGroup;
  @Input() fields: FormField[] = [];
  @Output() formSubmit = new EventEmitter<void>();

  isSubmitting = false;

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.formSubmit.emit();
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) return 'Bu alan zorunludur';
      if (control.errors['email']) return 'Geçerli bir e-posta adresi giriniz';
    }
    return '';
  }
}
