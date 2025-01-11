import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div *ngFor="let field of fields" class="mb-4">
        <label>{{ field.label }}</label>
        <input
          *ngIf="field.type !== 'textarea'"
          [type]="field.type"
          [formControlName]="field.name"
          class="input-class"
        />
        <textarea
          *ngIf="field.type === 'textarea'"
          [formControlName]="field.name"
          class="textarea-class"
        ></textarea>
      </div>
      <button type="submit" class="button-class" [disabled]="!form.valid">Kaydet</button>
    </form>
  `
})
export class GenericFormComponent {
  @Input() form!: FormGroup;
  @Input() fields: { name: string; label: string; type: string }[] = [];
  @Output() formSubmit = new EventEmitter<void>();

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit();
    }
  }
}
