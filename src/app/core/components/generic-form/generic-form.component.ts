import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
      <div *ngFor="let field of fields" class="space-y-2">
        <label [for]="field.name" class="block text-sm font-medium text-gray-700">
          {{ field.label }}
        </label>

        <input
          *ngIf="field.type !== 'textarea'"
          [id]="field.name"
          [type]="field.type"
          [formControlName]="field.name"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm
                 px-4 py-2 border outline-none transition-colors duration-200
                 disabled:bg-gray-100 disabled:cursor-not-allowed
                 {{form.get(field.name)?.invalid && form.get(field.name)?.touched ? 'border-red-500' : 'border-gray-300'}}"
        />

        <textarea
          *ngIf="field.type === 'textarea'"
          [id]="field.name"
          [formControlName]="field.name"
          rows="4"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm
                 px-4 py-2 border outline-none transition-colors duration-200
                 disabled:bg-gray-100 disabled:cursor-not-allowed
                 {{form.get(field.name)?.invalid && form.get(field.name)?.touched ? 'border-red-500' : 'border-gray-300'}}"
        ></textarea>

        <div *ngIf="form.get(field.name)?.invalid && form.get(field.name)?.touched"
             class="text-sm text-red-500 mt-1">
          <span *ngIf="form.get(field.name)?.errors?.['required']">
            Bu alan zorunludur
          </span>
          <span *ngIf="form.get(field.name)?.errors?.['email']">
            Geçerli bir e-posta adresi giriniz
          </span>
        </div>
      </div>

      <div class="flex justify-end space-x-4 mt-8">
        <button
          type="submit"
          [disabled]="!form.valid"
          class="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Kaydet
        </button>
      </div>
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
