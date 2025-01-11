export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  validators?: any[];
}

export const SCHOOL_FORM_FIELDS: FormField[] = [
  { name: 'name', label: 'Okul Adı', type: 'text' },
  { name: 'address', label: 'Adres', type: 'textarea' },
  { name: 'phone', label: 'Telefon', type: 'tel' },
  { name: 'managerName', label: 'Yönetici Adı', type: 'text' },
  { name: 'managerPhone', label: 'Yönetici Telefonu', type: 'tel' },
  { name: 'managerEmail', label: 'Yönetici E-posta', type: 'email' }
];
