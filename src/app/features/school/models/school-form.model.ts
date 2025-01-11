import { FormField } from "../../../core/models/form-field.model";

export const SCHOOL_FORM_FIELDS: FormField[] = [
  { name: 'name', label: 'Okul Adı', type: 'text', required: true },
  { name: 'address', label: 'Adres', type: 'textarea', required: true },
  { name: 'phone', label: 'Telefon', type: 'tel', required: true },
  { name: 'managerName', label: 'Yönetici Adı', type: 'text', required: true },
  { name: 'managerPhone', label: 'Yönetici Telefonu', type: 'tel', required: true },
  { name: 'managerEmail', label: 'Yönetici E-posta', type: 'email', required: true }
];
